import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { useDispatch, useStore } from 'react-redux';
import RSWSClient from '../net/ws/RSWSClient';
import { useNavigate } from 'react-router';
import { logOut } from '../actions';

function Chat() {
  const { id } = useParams();
  // const [chatType, chatId] = id.split('-');
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addMessageToQueue = (message) => setQueue(prevState => [message, ...prevState]);

  const handleError = () => {
    dispatch(logOut());
    navigate('/login');
  };

  useEffect(() => {
    // On component mount
    window.addEventListener('beforeunload', function() {
      client.disconnect(); // Executed when the page is reloaded
    });

    client.onMessage(addMessageToQueue, handleError);

    return () => {
      // On component unmount
      client.disconnect(); // Executed when the page is changed
    };
  }, []);

  function checkUserAccessToCourseAndGroupChats() {

  }

  function sendTextMessage(textMessage) {
    const message = client.prepareTextMessage(textMessage);

    if (client.send(message)) { // Send the message to other clients
      addMessageToQueue(message); // Add the message to my queue
    }
  }

  useEffect(checkUserAccessToCourseAndGroupChats, []);

  return (
    <Container component='main'>
      <CssBaseline />

      <Grid container direction='column'>
        <Grid item sx={{ mt: 4 }}>
          <ChatBox messages={queue} />
        </Grid>

        <Grid item>
          <ChatTextBar addMessage={addMessageToQueue} sendTextMessage={sendTextMessage} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
