import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';
import ChatBox from '../components/ChatBox';

function Chat(props) {
  const { id } = useParams();
  const chatType = id.split('-')[0];
  const chatId = id.split('-')[1];

  const [totalMessages, setTotalMessages] = useState([
    { text: 'Hello 1' },
    { text: 'Hello 2' },
    { text: 'Hello 3' },
    { text: 'Hello 4' },
    { text: 'Hello 5' },
    { text: 'Hello 6' },
    { text: 'Hello 1' },
    { text: 'Hello 2' },
    { text: 'Hello 3' },
    { text: 'Hello 4' },
    { text: 'Hello 5' },
    { text: 'Hello 6' },
    { text: 'Hello 1' },
    { text: 'Hello 2' },
    { text: 'Hello 3' },
    { text: 'Hello 4' },
    { text: 'Hello 5' },
    { text: 'Hello 6' },
    { text: 'Hello 1' },
    { text: 'Hello 2' },
    { text: 'Hello 3' },
    { text: 'Hello 4' },
    { text: 'Hello 5' },
    { text: 'Hello 6' },
    { text: 'Hello 1' },
    { text: 'Hello 2' },
    { text: 'Hello 3' },
    { text: 'Hello 4' },
    { text: 'Hello 5' },
    { text: 'Hello 6' },
  ].reverse());

  function checkUserAccessToCourseAndGroupChats() {

  }

  function addMessage(message) {
    setTotalMessages([message, ...totalMessages]);
  }

  useEffect(checkUserAccessToCourseAndGroupChats, []);

  return (
    <Container component='main'>
      <CssBaseline />

      <Grid container direction='column' >
        <Grid item sx={{ mt: 4 }}>
          <ChatBox messages={totalMessages} />
        </Grid>

        <Grid item>
          <ChatTextBar addMessage={addMessage} />
        </Grid>
      </Grid>
    </Container>
  );
}

// Todo: messages must be a grid with direction column-reverse

export default Chat;
