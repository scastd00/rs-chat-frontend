import React, { useEffect, useRef } from 'react';
import { Container, Grid } from '@mui/material';
import ChatMessage from './ChatMessage';

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
        {messages.map((m, index) => (
          <Grid item key={index} sx={{ my: 0.6 }}>
            <ChatMessage message={m} />
          </Grid>
        ))}
      </Grid>

      <div style={{ float: 'left', clear: 'both' }} ref={divRef} />
    </Container>
  );
}

export default ChatBox;
