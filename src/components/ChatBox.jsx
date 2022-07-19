import React from 'react';
import { Container, Grid } from '@mui/material';

function ChatBox(props) {
  return (
    <Container
      component='main'
      sx={{ top: 0, left:0, height: '100%', width: '100%' }}
    >
      <Grid container>
        <Grid item>
          <h1>title</h1>
          <h1>title</h1>
          <h1>title</h1>
          <h1>title</h1>
          <h1>title</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatBox;
