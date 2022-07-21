import React from 'react';
import { Grid, Typography } from '@mui/material';

function TextChatCard({ text }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TextChatCard;
