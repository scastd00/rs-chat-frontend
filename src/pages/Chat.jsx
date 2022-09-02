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
import ActiveUsers from '../components/ActiveUsers';
import FileService from '../services/FileService';

function Chat() {
  const { id } = useParams();
  const [, chatId] = id.split('-');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeUsers, setActiveUsers] = useState([]);
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

  useEffect(() => {
    // On component mount
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

  function uploadFiles(files) {
    files.forEach((file) => {
      FileService
        .uploadFile(file, userState.tokens.accessToken)
        .then(res => {
          const message = client.prepareMessage(res.data, res.data.metadata.messageType);

          if (client.send(message)) {
            addMessageToQueue(message);
          }
        })
        .catch(err => {
          checkResponse(err, navigate, dispatch);
        });
    });
  }

  useEffect(() => {
    ChatService
      .getChatInfo(chatId, userState.tokens.accessToken)
      .then((res) => {
        setChatInfo({
          name: res.data.name,
          metadata: JSON.parse(res.data.metadata),
        });
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  return (
    <Grid container>
      <CssBaseline />

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
        <ActiveUsers activeUsers={activeUsers} />
      </Grid>
    </Grid>
  );
}

export default Chat;
