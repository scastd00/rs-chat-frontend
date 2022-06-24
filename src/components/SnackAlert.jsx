import React from 'react';
import { Alert, Snackbar } from '@mui/material';

function SnackAlert({ open, severity, children }) {
  return (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Alert severity={severity} variant='filled'>
        {children}
      </Alert>
    </Snackbar>
  );
}

export default SnackAlert;
