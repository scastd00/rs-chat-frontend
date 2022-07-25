import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';
import { DEFAULT_MESSAGES } from '../utils/constants';
import ChatService from '../services/ChatService';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';
import { useDispatch, useStore } from 'react-redux';
import RSWSClient from '../net/ws/RSWSClient'

function Chat(props) {
  const { id } = useParams();
  const [chatType, chatId] = id.split('-');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useStore().getState().user;

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
    const messageData = {
      message: textMessage,
      metadata: {
        chatId,
        chatType,
        username: userState.user.username,
        date: new Date(),
      },
    };

    ChatService
      .sendTextMessage(messageData, id, userState.tokens.accessToken)
      .catch(error => {
        checkResponse(error, navigate, dispatch);
        alert(error.message);
      });
  }

  const client = new RSWSClient(userState.user.username, id);
  client.connect();
  const clientSocket = client.getSocket();

  clientSocket.onmessage = function(message) {
    console.log(message);
  };

  clientSocket.onopen = function() {
    clientSocket.send(JSON.stringify({
      headers: {
        username: 'Process WEB',
        chatId: 'c-1',
        dateSignIn: 484029384028409,
        type: 'NEW_USER',
      },
      body: {
        encoding: 'UTF-8',
        content: 'Hello, I am a web client',
      },
    }));
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
