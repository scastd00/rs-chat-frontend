import React, { useEffect, useRef } from 'react';
import { Container, Grid } from '@mui/material';
import UserMessage from './UserMessage';
import ServerMessage from './ServerMessage';
import { USER_MESSAGES } from '../net/ws/MessageProps';

function ChatBox({ messages }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  return (
    <Container
      sx={{
        maxHeight: 800,
        minHeight: 800,
        bgcolor: 'chatBackground.main',
        border: '1px solid',
        borderColor: 'primary.main',
        position: 'relative',
        '&::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar
      }}
      style={{ overflow: 'scroll' }}
    >
      <Grid
        container
        direction='column-reverse'
        sx={{
          width: '100%',
          left: 0,
          px: 2,
        }}
      >
        {
          messages.map((msg, index) => (
            <Grid item key={index} sx={{ my: 0.6 }}>
              {
                // If the message is of type user
                USER_MESSAGES.includes(msg.headers.type)
                  ? <UserMessage message={msg} />
                  : <ServerMessage message={msg} />
              }
            </Grid>
          ))
        }
      </Grid>

      <div style={{ float: 'left', clear: 'both' }} ref={divRef} />
    </Container>
  );
}

export default ChatBox;
