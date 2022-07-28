import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { useStore } from 'react-redux';
import { TEXT_MESSAGE } from '../net/ws/MessageType';
import RSWSClient from '../net/ws/RSWSClient';
import { createMessage } from '../utils';

function Chat() {
  const { id } = useParams();
  const [chatType, chatId] = id.split('-');

  const userState = useStore().getState().user;
  const [client] = useState(() => new RSWSClient(
    userState.user.username,
    id,
    userState.sessionId,
    userState.tokens.accessToken,
  ));
  const [queue, setQueue] = useState([]);

  const addMessageToQueue = (message) => setQueue(prevState => [message, ...prevState]);

  useEffect(() => {
    // On component mount
    window.addEventListener('beforeunload', function() {
      client.disconnect(); // Executed when the page is reloaded
    });

    client.onMessage((message) => {
      console.log('Use effect & onMessage', message);
      addMessageToQueue(message);
    });

    return () => {
      // On component unmount
      client.disconnect(); // Executed when the page is changed
    };
  }, []);

  function checkUserAccessToCourseAndGroupChats() {

  }

  function sendTextMessage(textMessage) {
    const message = createMessage(
      userState.user.username,
      id,
      userState.sessionId,
      TEXT_MESSAGE,
      userState.tokens.accessToken,
      'UTF-8',
      textMessage,
    );

    addMessageToQueue(message); // Add the message to my queue
    client.send(message); // Send the message to other clients
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
