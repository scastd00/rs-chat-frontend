import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { DEFAULT_MESSAGES } from '../utils/constants';
import { useStore } from 'react-redux';
import { useWebSocket } from '../hooks/useWebSocket';

function Chat(props) {
  const { id } = useParams();
  const [chatType, chatId] = id.split('-');
  const state = useStore().getState();
  const userState = state.user;
  const client = useWebSocket().getClient();

  const [totalMessages, setTotalMessages] = useState(DEFAULT_MESSAGES.reverse());

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
        chatId,
        dateSignIn: 0, // Todo: take from session of the state of the user
        type: chatType,
        Authentication: userState.tokens.accessToken,
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
