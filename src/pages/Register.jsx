import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { setAvailableChats, setSessionId, setToken, setUser } from '../actions';
import AuthService from '../services/AuthService';
import ErrorAlert from '../components/ErrorAlert';
import SnackAlert from '../components/SnackAlert';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

function Register() {
  //! ----------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //! ----------------------------

  const [registerError, setRegisterError] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [snackbarError, setSnackbarError] = useState(false);
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const theme = useTheme();

  const setStateOfStore = ({ user, session, chats }) => {
    dispatch(setUser(user));
    dispatch(setToken(session.token));
    dispatch(setSessionId(session.id));
    dispatch(setAvailableChats(chats));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!termsAccepted) {
      setSnackbarError(true);

      const timeout = setTimeout(() => {
        setSnackbarError(false);
        clearTimeout(timeout);
      }, 2500);

      return;
    }

    const data = new FormData(event.currentTarget);
    setShowLoadingSpinner(true);

    AuthService
      .register({
        username: data.get('username'),
        fullName: data.get('fullName'),
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
        agreeTerms: termsAccepted,
      })
      .then((res) => {
        setStateOfStore(res.data);
        navigate('/home');
      })
      .catch((e) => {
        setShowLoadingSpinner(false);
        setRegisterError(e.response.data.error);
      });
  };

  const checkUsername = (event) => {
    const len = event.target.value.length;

    if (len < 5 || len > 15) {
      setUsernameError('Username must be between 5 and 15 characters');
    } else {
      setUsernameError('');
    }
  };

  const checkPassword = (event) => {
    const pass = event.target.value;
    const len = pass.length;
    setPassword(pass);

    if (len < 8 || len > 32) {
      setPasswordError('Password must be between 8 and 32 characters');
    } else {
      setPasswordError('');
    }
  };

  const checkConfirmPassword = (event) => {
    const confirmation = event.target.value;

    if (password !== confirmation) {
      setConfirmationError('Passwords do not match');
    } else {
      setConfirmationError('');
    }
  };

  const togglePasswordMask = () => {
    setShowPassword(!showPassword);
  };

  const inputPropsForPasswordMask = {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton onMouseDown={togglePasswordMask} onMouseUp={togglePasswordMask}>
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Container component='main'>
      <CssBaseline />

      <Grid container spacing={16} direction='row' justifyContent='center'>
        <Grid item xs={7.5}>
          <Box sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <VpnKeyIcon />
            </Avatar>

            <Typography component='h1' variant='h5'>
              Register
            </Typography>

            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 4 }}>
              <Grid container spacing={4}>
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
                    onChange={() => setRegisterError('')}
                    variant='standard'
                    color='secondary'
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
                    onChange={() => setRegisterError('')}
                    helperText={usernameError}
                    error={usernameError.length !== 0}
                    onInput={checkUsername}
                    variant='standard'
                    color='secondary'
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
                    onChange={() => setRegisterError('')}
                    variant='standard'
                    color='secondary'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size='small'
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    autoComplete='new-password'
                    onChange={() => setRegisterError('')}
                    helperText={passwordError}
                    error={passwordError.length !== 0}
                    onInput={checkPassword}
                    variant='standard'
                    color='secondary'
                    InputProps={inputPropsForPasswordMask}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    size='small'
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showPassword ? 'text' : 'password'}
                    id='confirmPassword'
                    onChange={() => setRegisterError('')}
                    helperText={confirmationError}
                    error={confirmationError.length !== 0}
                    onInput={checkConfirmPassword}
                    variant='standard'
                    color='secondary'
                    InputProps={inputPropsForPasswordMask}
                  />
                </Grid>

                {/* Show registerError when it is received from the server */}
                {registerError.length > 0 && <ErrorAlert content={registerError} />}
              </Grid>

              <FormControlLabel
                sx={{ pt: 2 }}
                onChange={(event) => {
                  setTermsAccepted(event.target.checked);
                }}
                checked={termsAccepted}
                control={<Checkbox value='terms' color='primary' />}
                label={
                  <Typography fontSize={14}>
                    Registering means you that you have read and agree to the{' '}
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

              <Button type='submit' fullWidth variant='contained' sx={{ my: 2 }}>
                Register
              </Button>

              <Typography textAlign='right'>
                <Link component='button' type='button' variant='body2' onClick={() => navigate('/login')} sx={{}}>
                  Already have an account? Log in
                </Link>
              </Typography>
            </Box>
          </Box>

          {
            showLoadingSpinner && (
              <Grid container direction='column' alignItems='center' sx={{ pt: 10 }} spacing={0.8}>
                <Grid item>
                  <PuffLoader loading={showLoadingSpinner} size={40} color={theme.palette.info.main} />
                </Grid>

                <Grid item>
                  <Typography>Registering</Typography>
                </Grid>
              </Grid>
            )
          }
        </Grid>
      </Grid>

      <SnackAlert open={snackbarError} severity='error'>
        You must accept the terms and conditions to register.
      </SnackAlert>
    </Container>
  );
}

export default Register;
