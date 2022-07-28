import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../utils';
import { SERVER_INFO_MESSAGE, USER_CONNECTED, USER_DISCONNECTED } from '../net/ws/MessageProps';
import ErrorChatCard from './cards/ErrorChatCard';
import UserEventChatCard from './cards/UserEventChatCard';
import ServerInfoChatCard from './cards/ServerInfoChatCard';

function ServerMessage({ message }) {
  return (
    <Paper sx={{ px: 2, py: 0.5 }} elevation={5}>
      <Grid container direction='row'>
        <Grid item mr={1.5}>
          <Typography>
            {message.headers.username}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='text' component='span' fontSize={11}>
            {prettyDate(message.headers.date)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container mt={0.5}>
        <Grid item xs>
          {(() => {
            switch (message.headers.type) {
              case USER_CONNECTED:
              case USER_DISCONNECTED:
                return <UserEventChatCard text={message.body.content} />;

              case SERVER_INFO_MESSAGE:
                return <ServerInfoChatCard text={message.body.content} />;

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
