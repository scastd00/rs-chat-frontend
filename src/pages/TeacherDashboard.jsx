import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';

function TeacherDashboard() {
  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h3'>Teacher Dashboard</Typography>
    </Container>
  );
}

export default TeacherDashboard;
