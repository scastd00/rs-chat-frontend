import React from 'react';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { prettyDate } from '../../utils';

function TextChatCard({ text, date, username }) {
  return (
    <Paper sx={{ px: 2, py: 0.5 }} elevation={5}>
      <Grid container direction='row'>
        <Grid item mr={1.5}>
          <Typography>
            {username}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='text' component='span' fontSize={11}>
            {prettyDate(date)}
          </Typography>
        </Grid>
      </Grid>

      <Grid container mt={0.5}>
        <Grid item xs zeroMinWidth>
          <Typography style={{overflowWrap: 'break-word'}}>
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TextChatCard;
