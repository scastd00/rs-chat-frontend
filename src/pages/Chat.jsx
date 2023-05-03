import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { useStore } from 'react-redux';
import { logOut } from '../actions';
import ChatService from '../services/ChatService';
import { checkResponse } from '../utils';
import { GET_HISTORY_MESSAGE, TEXT_MESSAGE } from '../net/ws/MessageTypes';
import UsersList from '../components/UsersList';
import FileService from '../services/FileService';
import { useAudio } from '../hooks/useAudio';
import useAdapt from '../hooks/useAdapt';
import { WebSocketContext } from '../utils/constants';
import { useNavDis } from '../hooks/useNavDis';
import UserService from "../services/UserService";
import TextField from "@mui/material/TextField";
import SnackAlert from "../components/SnackAlert";

function Chat() {
  const state = useStore().getState();
  const id = state.history.present.split('#')[1];
  const userState = state.user;

  const [navigate, dispatch] = useNavDis();
  const [, toggleMsgNotification] = useAudio('https://rs-chat-bucket.s3.eu-west-3.amazonaws.com/audio/Notification.mp3');
  const [, toggleMentionNotification] = useAudio('https://rs-chat-bucket.s3.eu-west-3.amazonaws.com/audio/Mention.mp3');
  const [showPage, setShowPage] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    name: '',
    metadata: {},
  });
  const [leaveChatDialog, setLeaveChatDialog] = useState(false);
  const [direction] = useAdapt();
  const [invitee, setInvitee] = useState('');
  const [inviteDialog, setInviteDialog] = useState(false);
  const [inviteError, setInviteError] = useState({
    show: false,
    message: '',
  });

  // WebSocket client from context
  const client = useContext(WebSocketContext);

  const addMessageToQueue = (message) => setQueue(prevState => [message, ...prevState]);

  const handleError = () => {
    dispatch(logOut());
    navigate('/login');
  };

  /**
   * Displays the active users in the chat.
   * @param usernames {string[]} The usernames of the active users.
   */
  const displayActiveUsers = (usernames) => {
    setActiveUsers(usernames.filter(username => username !== userState.user.username));
  };

  const handleHistory = (messages) => {
    setQueue(prevState => [...prevState, ...messages.reverse()]);
  };

  function fetchChatInfo() {
    const chatInfo = ChatService
      .getChatInfo(id, userState.token)
      .then(res => {
        setChatInfo({
          name: res.data.name,
          metadata: res.data.metadata,
        });
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    const allUsers = ChatService
      .getAllUsersOfChat(id, userState.token)
      .then(res => {
        setAllUsers(res.data);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    return Promise.all([chatInfo, allUsers]);
  }

  function initConnection() {
    if (id.length === 0) {
      navigate('/home');
      return;
    }

    ChatService
      .connectTo(id, userState.user.id, userState.token)
      .then(response => {
        // We check access here to prevent a user who doesn't have access to the chat to access it
        // by changing the url.
        if (!response.data) {
          client.disconnectFromChat();
          navigate('/home');
          return;
        }

        // We connect to the chat after getting the information of the chat
        fetchChatInfo()
          .then(() => {
            client.setUsername(userState.user.username);
            client.setChatId(id);
            client.setSessionId(userState.sessionId);
            client.setToken(userState.token);
            client.connectToChat();
            setShowPage(true);
          });
      })
      .catch(err => {
        client.disconnectFromChat();
        checkResponse(err, navigate, dispatch);
      });
  }

  // Effect to execute every time the chat id changes (when user changes chat)
  useEffect(() => {
    // Restart all the chain for connecting the client to the server
    // when the id of the URL changes.

    // Disconnect from previous chat (if connected), to avoid multiple connections or exceptions in backend.
    client.disconnectFromChat();
    setShowPage(false);
    initConnection();
  }, [state.history.present]);

  // Setup effect to prepare functions to be called by the client when receiving messages or quitting the chat.
  useEffect(() => {
    // On component mount

    // This is executed before any message is sent to the server,
    // so we can execute them immediately after the socket is connected to
    // speed up the process of getting the data.
    client.onMessage(
      addMessageToQueue,
      handleError,
      displayActiveUsers,
      handleHistory,
      handleTooFastMessage,
      handleKickMessage,
      toggleMsgNotification,
      toggleMentionNotification,
    );

    return () => {
      // On component unmount (executed when the page is changed or reloaded, not needed event listener)
      client.disconnectFromChat();
    };
  }, []);

  function handleKickMessage(message) {
    client.disconnectFromServer();
    alert(message);
    dispatch(logOut());
  }

  function handleTooFastMessage() {
    // Search the last message that this user sent and remove it from the queue
    setQueue(prevState => {
      const index = prevState.findIndex(message => message.headers.username === userState.user.username);

      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  }

  function sendTextMessage(textMessage) {
    const message = client.prepareMessage(textMessage, TEXT_MESSAGE);

    if (client.send(message)) { // Send the message to other clients
      addMessageToQueue(message); // Add the message to my queue
    }
  }

  /**
   * Sends the files to the server and then sends the message to the other clients
   * in the order they were sent.
   *
   * @param files The files to be sent.
   */
  function uploadFiles(files) {
    /** @type Promise<*>[] */
    const uploadPromises = files.map(file => FileService.uploadFile(file, userState.user.id, userState.token));

    Promise
      .allSettled(uploadPromises) // This allows to perform actions even if some promises fail.
      .then(uploadedFilesPromises =>
        uploadedFilesPromises
          .filter(promise => promise.status === "fulfilled")
          .forEach(promise => {
            const { data } = promise.value;
            const message = client.prepareMessage(data, data.metadata.messageType);

            if (client.send(message)) {
              addMessageToQueue(message);
            }
          }));
  }

  function handleLeaveChat() {
    ChatService
      .leaveChat(id, userState.user.id, userState.token)
      .then(() => {
        client.disconnectFromChat();
        navigate('/home');
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }

  function loadMore() {
    // We want to request the messages prior to this offset
    client.send(`${queue.length}`, GET_HISTORY_MESSAGE);
  }

  function handleInvite() {
    UserService
      .inviteUserToChat(userState.user.username, invitee, id, userState.token)
      .then(_ => {
        setInvitee('');
        setInviteDialog(false);
      })
      .catch(err => {
        setInviteError({
          show: true,
          message: err.response.data
        });

        setTimeout(() => {
          setInviteError(prevState => {
            return {
              ...prevState,
              show: false,
            };
          });
        }, 2500);

        checkResponse(err, navigate, dispatch);
      });
  }

  return (
    <CssBaseline>
      {showPage && (
        <Grid container direction={direction}>
          <Grid item xs>
            <Container component="main" sx={{ pt: 1 }}>
              <CssBaseline />

              <Grid container direction="column" spacing={1}>
                <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h5">
                      Current chat: {chatInfo.name}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button color="info" onClick={() => setInviteDialog(true)} sx={{ mr: 2 }}>
                      Invite user
                    </Button>
                    <Button color="error" onClick={() => setLeaveChatDialog(true)}>
                      Leave chat
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <ChatBox messages={queue} handleLoadMore={loadMore} />
                </Grid>

                <Grid item>
                  <ChatTextBar sendTextMessage={sendTextMessage} sendFiles={uploadFiles} />
                </Grid>
              </Grid>
            </Container>
          </Grid>

          <Grid item m={1} xs={2} sx={{ border: '1px solid', borderColor: 'secondary.main' }}>
            <UsersList activeUsers={activeUsers} allUsers={allUsers} />
          </Grid>
        </Grid>
      )}

      <Dialog open={leaveChatDialog} onClose={() => setLeaveChatDialog(false)}>
        <DialogTitle>Leave chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave this chat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={() => setLeaveChatDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleLeaveChat}>Leave</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={inviteDialog} onClose={() => setInviteDialog(false)}>
        <DialogTitle>Invite user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the username of the user you want to invite to this chat.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="invitee"
            label="Username"
            type="text"
            size="small"
            fullWidth
            value={invitee}
            onChange={evt => setInvitee(evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setInviteDialog(false)}>Cancel</Button>
          <Button color="success" onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>

      <SnackAlert open={inviteError.show} severity={"error"}>
        {inviteError.message}
      </SnackAlert>
    </CssBaseline>
  );
}

export default Chat;
