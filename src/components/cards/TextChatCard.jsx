import React from 'react';
import { Grid, Typography } from '@mui/material';

function TextChatCard({ text, customColor }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          sx={customColor ? { color: customColor } : {}}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TextChatCard;
