import React from 'react';
import { MESSAGE_TYPES as MT } from '../utils/constants';
import TextChatCard from './cards/TextChatCard';
import ImageChatCard from './cards/ImageChatCard';
import AudioChatCard from './cards/AudioChatCard';
import VideoChatCard from './cards/VideoChatCard';
import ErrorChatCard from './cards/ErrorChatCard';
import { Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../utils';

function ChatMessage({ data, type }) {
  return (
    <Paper sx={{ px: 2, py: 0.5 }} elevation={5}>
      <Grid container direction='row'>
        <Grid item mr={1.5}>
          <Typography>
            {data.username}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='text' component='span' fontSize={11}>
            {prettyDate(data.date)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container mt={0.5}>
        <Grid item xs>
          {(() => {
            switch (type) {
              case MT.TEXT:
                return <TextChatCard text={data.text} />;

              case MT.IMAGE:
                return <ImageChatCard />;

              case MT.AUDIO:
                return <AudioChatCard />;

              case MT.VIDEO:
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
