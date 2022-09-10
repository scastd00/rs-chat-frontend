import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router';

function CreatePassword() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ code: '', newPassword: '', confirmPassword: '' });

  function handleSubmit() {
    // Todo

    AuthService
      .createPassword(formFields)
      .then(() => {
        navigate('/login');
      })
      .catch(() => {
      });
  }

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant='h3'>Create Password</Typography>
        </Grid>

        <Grid item>
          <Typography variant='body1'>
            Enter the code we sent to your email address below and create a new password.
          </Typography>

          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            id='code'
            label='Code'
            name='code'
            autoFocus
            onChange={(e) => setFormFields({ ...formFields, code: e.target.value })}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            name='newPassword'
            label='New password'
            type='password'
            id='newPassword'
            onChange={(e) => setFormFields({ ...formFields, newPassword: e.target.value })}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            name='confirmNewPassword'
            label='Confirm new password'
            type='password'
            id='confirmNewPassword'
            onChange={(e) => setFormFields({ ...formFields, confirmPassword: e.target.value })}
          />

          <Button color='success' onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreatePassword;
