import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { logOut } from '../actions';
import ChatService from '../services/ChatService';
import { checkResponse } from '../utils';
import { TEXT_MESSAGE } from '../net/ws/MessageTypes';
import UsersList from '../components/UsersList';
import FileService from '../services/FileService';
import { useAudio } from '../hooks/useAudio';
import useAdapt from '../hooks/useAdapt';
import { WebSocketContext } from '../utils/constants';

function Chat() {
  const { id } = useParams();
  const [, chatId] = id.split('-');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, toggle] = useAudio('https://rs-chat-bucket.s3.eu-west-3.amazonaws.com/audio/Notification.mp3');
  const [showPage, setShowPage] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const userState = useStore().getState().user;
  const [queue, setQueue] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    name: '',
    metadata: {},
  });
  const [leaveChatDialog, setLeaveChatDialog] = useState(false);
  const [direction] = useAdapt();

  // WebSocket client from context
  const client = useContext(WebSocketContext);

  const addMessageToQueue = (message) => setQueue(prevState => [message, ...prevState]);

  const handleError = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const displayActiveUsers = (usernames) => {
    setActiveUsers(usernames);
  };

  const handleHistory = (messages) => {
    setQueue(messages);
  };

  function fetchChatInfo() {
    ChatService
      .getChatInfo(chatId, userState.token)
      .then(res => {
        setChatInfo({
          name: res.data.name,
          metadata: JSON.parse(res.data.metadata),
        });
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    ChatService
      .getAllUsersOfChat(chatId, userState.token)
      .then(res => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });
  }

  useEffect(() => {
    // On component mount

    // We check here to prevent a user who doesn't have access to the chat to access it
    // by changing the url.
    ChatService
      .userCanConnect(chatId, userState.user.id, userState.token)
      .then(response => {
        if (!response.data.canConnect) {
          client.disconnectFromChat();
          navigate('/home');
          return;
        }

        client.setUsername(userState.user.username);
        client.setChatId(id);
        client.setSessionId(userState.sessionId);
        client.setToken(userState.token);
        client.connect(); // If not connected (due to page refresh), we connect to the chat
        client.connectToChat();
        setShowPage(true);
        fetchChatInfo();
      })
      .catch(err => {
        client.disconnectFromChat();
        checkResponse(err, navigate, dispatch);
      });

    window.addEventListener('beforeunload', function() {
      client.disconnectFromChat(); // Executed when the page is reloaded
    });

    // This is executed before any message is sent to the server
    // So we can execute them immediately after the socket is connected to
    // speed up the process of getting the data.
    client.onMessage(
      addMessageToQueue,
      handleError,
      displayActiveUsers,
      handleHistory,
      toggle,
    );

    return () => {
      // On component unmount (executed when the page is changed)
      client.disconnectFromChat();
    };
  }, []);

  function sendTextMessage(textMessage) {
    const message = client.prepareMessage(textMessage, TEXT_MESSAGE);

    if (client.send(textMessage, TEXT_MESSAGE, true)) { // Send the message to other clients
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
    const uploadPromises = files.map(file => FileService.uploadFile(file, userState.user.id, userState.token));

    Promise
      .all(uploadPromises)
      .then(uploadedFiles => {
        uploadedFiles.forEach(file => {
          file.data.metadata = JSON.parse(file.data.metadata); // Parse the string that is received from the server to not cause problems
          const message = client.prepareMessage(file.data, file.data.metadata.messageType);

          if (client.send(message)) {
            addMessageToQueue(message);
          }
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  function handleLeaveChat() {
    ChatService
      .leaveChat(chatId, userState.user.id, userState.token)
      .then(() => {
        client.disconnectFromChat();
        navigate('/home');
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }

  return (
    <CssBaseline>
      {showPage && (
        <Grid container direction={direction}>
          <Grid item xs>
            <Container component='main' sx={{ pt: 1 }}>
              <CssBaseline />

              <Grid container direction='column' spacing={1}>
                <Grid item container direction='row' justifyContent='space-between' alignItems='center'>
                  <Grid item>
                    <Typography variant='h5'>
                      Current chat: {chatInfo.name}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button color='error' onClick={() => setLeaveChatDialog(true)}>
                      Leave chat
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <ChatBox messages={queue} />
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
          <Button color='success' onClick={() => setLeaveChatDialog(false)}>Cancel</Button>
          <Button color='error' onClick={handleLeaveChat}>Leave</Button>
        </DialogActions>
      </Dialog>
    </CssBaseline>
  );
}

export default Chat;
