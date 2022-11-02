import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { useNavDis } from '../../../hooks/useNavDis';
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  MenuItem,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import UserService from '../../../services/UserService';
import { checkResponse } from '../../../utils';
import SnackAlert from '../../../components/SnackAlert';

function AddUser() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT',
    agreeTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleConfirm() {
    UserService
      .createUser(formData, userState.token)
      .then(_ => {
        setFormData({
          email: '',
          username: '',
          fullName: '',
          password: '',
          confirmPassword: '',
          role: '',
          agreeTerms: true,
        });
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
        setErrorMessage(err.response.data.message);
      });
  }

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h3'>
        Add user
      </Typography>

      <Grid container spacing={4} sx={{ mt: 1, mb: 5 }}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            size='small'
            id='email'
            label='Email Address'
            autoFocus
            name='email'
            autoComplete='email'
            variant='standard'
            color='secondary'
            value={formData.email}
            onChange={(evt) => setFormData({ ...formData, email: evt.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            autoComplete='given-name'
            name='username'
            fullWidth
            size='small'
            id='username'
            label='Username'
            variant='standard'
            color='secondary'
            value={formData.username}
            onChange={(evt) => setFormData({ ...formData, username: evt.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            name='fullName'
            fullWidth
            size='small'
            id='fullName'
            label='Full name'
            variant='standard'
            color='secondary'
            value={formData.fullName}
            onChange={(evt) => setFormData({ ...formData, fullName: evt.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            size='small'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='new-password'
            variant='standard'
            color='secondary'
            value={formData.password}
            onChange={(evt) => setFormData({ ...formData, password: evt.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            size='small'
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            variant='standard'
            color='secondary'
            value={formData.confirmPassword}
            onChange={(evt) => setFormData({ ...formData, confirmPassword: evt.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            select
            value={formData.role}
            required
            fullWidth
            size='small'
            id='role'
            label='Role'
            margin='dense'
            onChange={(evt) => setFormData({ ...formData, role: evt.target.value })}
          >
            <MenuItem value='STUDENT'>Student</MenuItem>
            <MenuItem value='TEACHER'>Teacher</MenuItem>
            <MenuItem value='ADMINISTRATOR'>Administrator</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            onChange={(event) => setFormData({ ...formData, agreeTerms: event.target.checked })}
            checked={formData.agreeTerms}
            control={<Checkbox value='terms' color='primary' />}
            label={
              <Typography fontSize={14}>
                Registering means you that the user has read and agree to the{' '}
                <Link underline='hover' style={{ cursor: 'pointer' }} onClick={() => navigate('/terms')}>
                  Terms of Service
                </Link> and{' '}
                <Link underline='hover' style={{ cursor: 'pointer' }} onClick={() => navigate('/privacy')}>
                  Privacy Policy
                </Link>
                .
              </Typography>
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item>
          <Button color='success' variant='contained' onClick={handleConfirm}>Confirm</Button>
        </Grid>
        <Grid item>
          <Button color='error' variant='contained' onClick={() => navigate('/administration/users')}>Cancel</Button>
        </Grid>
      </Grid>

      <SnackAlert open={errorMessage.length !== 0} severity='error'>
        <Typography>{errorMessage}</Typography>
      </SnackAlert>
    </Container>
  );
}

export default AddUser;
