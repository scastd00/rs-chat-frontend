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
    ),
  );

  // My problem -> https://www.youtube.com/watch?v=ekAZndDRnwg
  // Minute 31:00
  // Conclusion: utilization of useRef() hook.

  const [totalMessages, setTotalMessages] = useState([]);
  // const [interval] = useState(() => setInterval(() => {
  //     if (client.isReady()) {
  //       console.log(client.getMessageQueue());
  //
  //       // client.getMessageQueue().forEach(addMessage);
  //       // client.clearMessageQueue();
  //     }
  // }, 500));

  // useEffect(() => {
  //   console.log(client.getMessageQueue());
  //   setTotalMessages(client.getMessageQueue());
  // }, [client.getMessageQueue()]);

  useEffect(() => {
    // On component mount
    window.addEventListener('beforeunload', function() {
      // clearInterval(interval);
      client.disconnect(); // Executed when the page is reloaded
    });

    // client.onMessage((message) => {
    //   // console.log(totalMessages); // Empty
    //   addMessage(message);
    // });

    return () => {
      // On component unmount
      // clearInterval(interval);
      client.disconnect(); // Executed when the page is changed
    };
  }, []);

  function checkUserAccessToCourseAndGroupChats() {

  }

  const addMessage = (message) => {
    // console.log('addMessage', message);
    setTotalMessages([message, ...totalMessages]);
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

    addMessage(message);
    client.send(message);
  }

  useEffect(checkUserAccessToCourseAndGroupChats, []);

  // useEffect(() => {
  //   client.onMessage((message) => {
  //     console.log(message);
  //   });
  // }, [client.isReady()]);

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
