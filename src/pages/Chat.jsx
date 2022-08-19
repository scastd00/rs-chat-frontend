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
import { ACTIVE_USERS_MESSAGE, TEXT_MESSAGE } from '../net/ws/MessageProps';

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

  useEffect(() => {
    // On component mount
    window.addEventListener('beforeunload', function() {
      client.disconnect(); // Executed when the page is reloaded
    });

    client.onMessage(addMessageToQueue, handleError, displayActiveUsers);

    setTimeout(() => {
      client.send('', ACTIVE_USERS_MESSAGE);
    }, 1500);

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
              <ChatTextBar addMessage={addMessageToQueue} sendTextMessage={sendTextMessage} />
            </Grid>
          </Grid>
        </Container>
      </Grid>

      <Grid item m={1} xs={2} sx={{ border: '1px solid', borderColor: 'secondary.main' }}>
        <Container component='main' sx={{ pt: 1 }}>
          <Typography variant='h5' sx={{ mb: 1 }}>Active users</Typography>

          {
            activeUsers.map((username) => (
              React.cloneElement(
                <Typography key={username} variant='body1'>{username}</Typography>,
              )
            ))
          }
        </Container>
      </Grid>
    </Grid>
  );
}

export default Chat;
