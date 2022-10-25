import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { useDispatch, useStore } from 'react-redux';
import RSWSClient from '../net/ws/RSWSClient';
import { useNavigate } from 'react-router';
import { logOut } from '../actions';
import ChatService from '../services/ChatService';
import { checkResponse } from '../utils';
import { TEXT_MESSAGE } from '../net/ws/MessageProps';
import UsersList from '../components/UsersList';
import FileService from '../services/FileService';
import { useAudio } from '../hooks/useAudio';
import useAdapt from '../hooks/useAdapt';

function Chat() {
  const { id } = useParams();
  const [, chatId] = id.split('-');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Todo: host this resource in home server
  const [, toggle] = useAudio('https://rs-chat-bucket.s3.eu-west-3.amazonaws.com/audio/Notification.mp3');

  const [showPage, setShowPage] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const userState = useStore().getState().user;
  const [client] = useState(() => new RSWSClient(
    userState.user.username,
    id,
    userState.sessionId,
    userState.tokens.accessToken,
    dispatch,
    navigate,
  ));
  const [queue, setQueue] = useState([]);
  const [chatInfo, setChatInfo] = useState({
    name: '',
    metadata: {},
  });

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
      .getChatInfo(chatId, userState.tokens.accessToken)
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
      .getAllUsersOfChat(chatId, userState.tokens.accessToken)
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
      .userCanConnect(chatId, userState.user.id, userState.tokens.accessToken)
      .then(response => {
        if (!response.data.canConnect) {
          client.disconnect();
          navigate('/home');
        } else {
          setShowPage(true);
          fetchChatInfo();

          /*
           * Client is already connected here.
           * Get the history and active users. It is more secure to do it here.
           * If done when the client is connected to the server, the server will send
           * the history and active users to the client, and the messages
           * can be scanned with WireShark (or other tools).
           */
        }
      })
      .catch(err => {
        client.disconnect();
        checkResponse(err, navigate, dispatch);
      });

    window.addEventListener('beforeunload', function() {
      client.disconnect(); // Executed when the page is reloaded
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
      // On component unmount
      client.disconnect(); // Executed when the page is changed
    };
  }, []);

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
    const uploadPromises = files.map(file => FileService.uploadFile(file, userState.user.id, userState.tokens.accessToken));

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

  const [direction] = useAdapt();

  return (
    <CssBaseline>
      {showPage && (
        <Grid container direction={direction}>
          <Grid item xs>
            <Container component='main' sx={{ pt: 1 }}>
              <CssBaseline />

              <Grid container direction='column' spacing={1}>
                <Grid item>
                  <Typography variant='h5'>Current chat: {chatInfo.name}</Typography>
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
    </CssBaseline>
  );
}

export default Chat;
