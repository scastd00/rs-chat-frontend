import React from 'react';
import { Grid, Typography } from '@mui/material';

function ServerInfoChatCard({ text }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth sx={{ textAlign: 'center' }}>
        <Typography style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ServerInfoChatCard;
