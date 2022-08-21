import React from 'react';
import { Grid, Typography } from '@mui/material';

function TextChatCard({ text, serverInfo }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          sx={serverInfo ? { color: 'message.info' } : {}}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TextChatCard;
