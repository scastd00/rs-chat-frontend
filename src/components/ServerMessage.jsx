import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../utils';
import { INFO_MESSAGE, USER_CONNECTED, USER_JOINED, USER_LEFT } from '../net/ws/MessageTypes';
import ErrorChatCard from './cards/ErrorChatCard';
import UserEventChatCard from './cards/UserEventChatCard';
import TextChatCard from './cards/TextChatCard';

function ServerMessage({ message }) {
  return (
    <Paper sx={{ px: 2, py: 0.5, background: 'transparent', textAlign: 'center' }} elevation={0}>
      <Grid container direction='column'>
        <Grid item xs>
          <Typography
            variant='text'
            component='span'
            fontSize={11}
            fontWeight='bold'
            sx={{ opacity: 0.5 }}
          >
            {prettyDate(message.headers.date)}
          </Typography>
        </Grid>

        <Grid item xs>
          {(() => {
            switch (message.headers.type) {
              case USER_CONNECTED:
              case USER_JOINED:
                return <UserEventChatCard text={message.body.content} connected />;

              case USER_LEFT:
                return <UserEventChatCard text={message.body.content} />;

              case INFO_MESSAGE:
                return <TextChatCard text={message.body.content} serverInfo />;

              default:
                return <ErrorChatCard />;
            }
          })()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ServerMessage;
