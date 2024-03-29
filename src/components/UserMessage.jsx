import React from 'react';
import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import { fullPrettyDate, prettyDate } from '../utils';
import {
  AUDIO_MESSAGE,
  IMAGE_MESSAGE,
  PDF_MESSAGE,
  TEXT_DOC_MESSAGE,
  TEXT_MESSAGE,
  VIDEO_MESSAGE,
} from '../net/ws/MessageTypes';
import TextChatCard from './cards/TextChatCard';
import ImageChatCard from './cards/ImageChatCard';
import AudioChatCard from './cards/AudioChatCard';
import VideoChatCard from './cards/VideoChatCard';
import ErrorChatCard from './cards/ErrorChatCard';
import PdfChatCard from './cards/PdfChatCard';
import TextDocChatCard from './cards/TextDocChatCard';
import ClickableUsername from './ClickableUsername';

function UserMessage({ message }) {
  return (
    <Paper sx={{ px: 2, py: 0.5 }} elevation={5}>
      <Grid container direction='row'>
        <Grid item mr={1.5}>
          <ClickableUsername username={message.headers.username} />
        </Grid>

        <Grid item>
          <Tooltip title={fullPrettyDate(message.headers.date)} placement='right' arrow>
            <Typography variant='text' component='span' fontSize={11}>
              {prettyDate(message.headers.date)}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid container my={0.5}>
        <Grid item xs>
          {(() => {
            switch (message.headers.type) {
              case TEXT_MESSAGE:
                return <TextChatCard text={message.body.content} type={TEXT_MESSAGE} />;

              case IMAGE_MESSAGE:
                return <ImageChatCard data={message.body.content} />;

              case AUDIO_MESSAGE:
                return <AudioChatCard data={message.body.content} />;

              case VIDEO_MESSAGE:
                return <VideoChatCard data={message.body.content} />;

              case PDF_MESSAGE:
                return <PdfChatCard data={message.body.content} />;

              case TEXT_DOC_MESSAGE:
                return <TextDocChatCard data={message.body.content} />;

              default:
                return <ErrorChatCard />;
            }
          })()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default UserMessage;
