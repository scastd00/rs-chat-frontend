import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import AuthService from '../services/AuthService';
import { useLocation, useNavigate } from 'react-router';

function CreatePassword() {
  const navigate = useNavigate();
  const url = useLocation();
  const [formFields, setFormFields] = useState({ code: '', newPassword: '', confirmPassword: '' });

  function handleSubmit() {
    AuthService
      .createPassword(formFields)
      .then(() => {
        navigate('/login');
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (url.search.length !== 0) {
      let searches = url.search.split('?');
      searches.shift();
      searches = searches.map((search) => search.split('='));

      searches.forEach((search) => {
        // If the url contains a search with the name 'code', set the code field to the value
        if (search[0] === 'code') {
          setFormFields({ ...formFields, code: search[1] });
        }
      });
    }
  }, []);

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
            value={formFields.code}
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
