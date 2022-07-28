import React from 'react';
import { AUDIO_MESSAGE, IMAGE_MESSAGE, TEXT_MESSAGE, VIDEO_MESSAGE } from '../net/ws/MessageProps';
import TextChatCard from './cards/TextChatCard';
import ImageChatCard from './cards/ImageChatCard';
import AudioChatCard from './cards/AudioChatCard';
import VideoChatCard from './cards/VideoChatCard';
import ErrorChatCard from './cards/ErrorChatCard';
import { Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../utils';

function ChatMessage({ message }) {
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
              case TEXT_MESSAGE:
                return <TextChatCard text={message.body.content} />;

              case IMAGE_MESSAGE:
                return <ImageChatCard />;

              case AUDIO_MESSAGE:
                return <AudioChatCard />;

              case VIDEO_MESSAGE:
                return <VideoChatCard />;

              default:
                return <ErrorChatCard />;
            }
          })()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ChatMessage;
