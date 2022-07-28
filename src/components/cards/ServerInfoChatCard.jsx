import React from 'react';
import { Grid, Typography } from '@mui/material';

function ServerInfoChatCard({ text }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          sx={{ color: 'message.info' }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ServerInfoChatCard;
