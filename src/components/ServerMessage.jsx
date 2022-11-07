import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../utils';
import {
  COMMAND_RESPONSE,
  INFO_MESSAGE,
  MAINTENANCE_MESSAGE,
  RESTART_MESSAGE,
  USER_JOINED,
  USER_LEFT,
} from '../net/ws/MessageTypes';
import ErrorChatCard from './cards/ErrorChatCard';
import UserEventChatCard from './cards/UserEventChatCard';
import TextChatCard from './cards/TextChatCard';

function ServerMessage({ message }) {
  function messageColor(type) {
    switch (type) {
      case INFO_MESSAGE:
      case COMMAND_RESPONSE:
        return 'message.info';
      case MAINTENANCE_MESSAGE:
        return 'message.warning';
      case RESTART_MESSAGE:
      default:
        return 'message.error';
    }
  }

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
              case USER_JOINED:
                return <UserEventChatCard text={message.body.content} connected />;

              case USER_LEFT:
                return <UserEventChatCard text={message.body.content} />;

              case MAINTENANCE_MESSAGE:
              case RESTART_MESSAGE:
              case INFO_MESSAGE:
                return <TextChatCard text={message.body.content} customColor={messageColor(message.headers.type)} />;

              case COMMAND_RESPONSE:
                const allCommands = message.body.content.split('##').map((text, index) => (
                  <React.Fragment key={index}>
                    {text}
                    <br />
                  </React.Fragment>
                ));
                return <TextChatCard text={allCommands} customColor={messageColor(message.headers.type)} />;

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
