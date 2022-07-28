import React from 'react';
import { Grid, Typography } from '@mui/material';

function UserEventChatCard({ text }) {
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

export default UserEventChatCard;
