import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CssBaseline, Grid } from '@mui/material';
import ChatTextBar from '../components/ChatTextBar';

function Chat(props) {
  const { id } = useParams();
  const chatType = id.split('-')[0];
  const chatId = id.split('-')[1];

  const messages = [
    'Hello 1',
    'Hello 2',
    'Hello 3',
    'Hello 4',
    'Hello 5',
    'Hello 6',
  ];
  const [totalMessages, setTotalMessages] = useState(messages.reverse());

  function checkUserAccessToCourseAndGroupChats() {

  }

  function addMessage(message) {
    setTotalMessages([message, ...totalMessages])
  }

  useEffect(checkUserAccessToCourseAndGroupChats, []);

  return (
    <Container
      sx={{
        mt: 4,
        maxHeight: 800,
        minHeight: 800,
        bgcolor: 'chatBackground.main',
        border: '4px solid',
        borderColor: 'primary.main',
        position: 'relative',
        '&::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar
        overflow: 'auto',
      }}
      style={{ overflow: 'scroll' }}
    >
      <CssBaseline />

      <Grid
        container
        direction='column-reverse'
        justifyContent='center'
        alignItems='stretch'
        textAlign='center'
        sx={{
          width: '100%',
          bottom: 0,
          left: 0,
          px: 2,
          position: 'absolute',
        }}
      >
        <Grid item>
          <ChatTextBar addMessage={addMessage} />
        </Grid>

        {totalMessages.map(m => (
          <Grid item>
            {m}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Todo: messages must be a grid with direction column-reverse

export default Chat;
