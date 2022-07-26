import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { DEFAULT_MESSAGES } from '../utils/constants';
import { useStore } from 'react-redux';
import { useWebSocket } from '../hooks/useWebSocket';
import { TEXT_MESSAGE } from '../net/ws/MessageType';

function Chat(props) {
  const { id } = useParams();
  const [chatType, chatId] = id.split('-');
  const state = useStore().getState();
  const userState = state.user;
  const client = useWebSocket(
    userState.user.username,
    id,
    userState.sessionId,
    userState.tokens.accessToken,
  ).getClient();
  const [s, setS] = useState(true);

  const [totalMessages, setTotalMessages] = useState(DEFAULT_MESSAGES.reverse());

  useEffect(() => {
    // On component mount
    window.addEventListener('beforeunload', function() {
      client.disconnect(); // Executed when the page is reloaded
    })

    return () => {
      // On component unmount
      client.disconnect(); // Executed when the page is changed
    };
  }, []);

  function checkUserAccessToCourseAndGroupChats() {

  }

  function addMessage(message) {
    setTotalMessages([{
      data: {
        text: message,
        date: new Date(),
        username: 'Samuel',
      },
    }, ...totalMessages]);
  }

  useEffect(checkUserAccessToCourseAndGroupChats, []);

  function sendTextMessage(textMessage) {
    client.send({
      headers: {
        username: userState.user.username,
        chatId: id, // Complete id
        sessionId: userState.sessionId,
        type: TEXT_MESSAGE,
        token: userState.tokens.accessToken,
      },
      body: {
        encoding: 'UTF-8',
        content: textMessage,
      },
    });
  }

  return (
    <Container component='main'>
      <CssBaseline />

      <Grid container direction='column'>
        <Grid item sx={{ mt: 4 }}>
          <ChatBox messages={totalMessages} />
        </Grid>

        <Grid item>
          <ChatTextBar addMessage={addMessage} sendTextMessage={sendTextMessage} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
