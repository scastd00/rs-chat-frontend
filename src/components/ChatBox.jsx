import React, { useEffect, useRef } from 'react';
import { Button, Container, Grid } from '@mui/material';
import UserMessage from './UserMessage';
import ServerMessage from './ServerMessage';
import { isUserMessage } from '../utils';
import { getWindowSize } from '../utils/constants';

function ChatBox({ messages, handleLoadMore }) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: getWindowSize().innerHeight - 200,
        maxHeight: getWindowSize().innerHeight - 200,
        bgcolor: 'chatBackground.main',
        border: '1px solid',
        borderColor: 'primary.main',
        position: 'relative',
        '&::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar
      }}
      style={{ overflow: 'scroll' }}
    >
      <Grid container>
        <Grid item xs={12} sx={{ textAlign: 'center', py: 3 }}>
          <Button variant='contained' color='primary' onClick={handleLoadMore}>
            Load more
          </Button>
        </Grid>
      </Grid>

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
                isUserMessage(msg.headers.type)
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
