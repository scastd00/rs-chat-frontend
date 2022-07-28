import React from 'react';
import { Grid, Typography } from '@mui/material';

function UserEventChatCard({ text, connected }) {
  return (
    <Grid container textAlign={'center'}>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          sx={{ color: connected ? 'message.joined' : 'message.left' }}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default UserEventChatCard;
