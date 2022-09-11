import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router';
import AuthService from '../services/AuthService';

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  function handleSubmit() {
    AuthService
      .forgotPassword(email)
      .then(() => {
        navigate('/createPassword');
      })
      .catch(console.error);
  }

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant='h3'>Forgot Password</Typography>

          <Typography variant='body1' sx={{ my: 1 }}>
            <Link component='button' type='button' variant='body2' underline='hover' onClick={() => navigate('/login')}>
              Back to Login
            </Link>
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='body1'>
            Enter your email address below and we'll send you a code to reset your password.
          </Typography>

          <TextField
            margin='normal'
            fullWidth
            size='small'
            id='email'
            label='Email address'
            name='email'
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button color='success' onClick={handleSubmit}>
            Send Code
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ForgotPassword;
