import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import Grid from '@mui/material/Grid';

function ErrorAlert({ content }) {
  return (
    <Grid item xs={12}>
      <Alert severity='error' variant='filled'>
        <AlertTitle>Error</AlertTitle>
        {content}
      </Alert>
    </Grid>
  );
}

export default ErrorAlert;
