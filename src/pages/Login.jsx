import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthService from '../services/AuthService';
import { setAvailableChats, setSessionId, setToken, setUser } from '../actions';
import { PuffLoader } from 'react-spinners';
import { useTheme } from '@mui/material';
import ErrorAlert from '../components/ErrorAlert';
import { useNavDis } from '../hooks/useNavDis';

function Login() {
  const [loginError, setLoginError] = useState('');
  const [navigate, dispatch] = useNavDis();
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [remember, setRemember] = useState(false);
  const theme = useTheme();

  const setStateOfStore = ({ user, session, chats }) => {
    dispatch(setUser(user));
    dispatch(setToken(session.token));
    dispatch(setSessionId(session.id));
    dispatch(setAvailableChats(chats));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setShowLoadingSpinner(true);

    const data = new FormData(event.currentTarget);
    AuthService
      .login({
        username: data.get('username'),
        password: data.get('password'),
        remember,
      })
      .then(res => {
        setStateOfStore(res.data);
        navigate('/home');
      })
      .catch(e => {
        setShowLoadingSpinner(false);
        setLoginError(e.response.data.error);
      });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={() => setLoginError('')}
          />

          <TextField
            margin='normal'
            required
            fullWidth
            size='small'
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={() => setLoginError('')}
          />

          <FormControlLabel
            control={<Checkbox value='remember' color='primary' onChange={() => setRemember(!remember)} />}
            label='Remember me'
            sx={{ mb: 1 }}
          />

          {/* Show loginError when it is received from the server */}
          {loginError.length > 0 && <ErrorAlert content={loginError} />}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ my: 2 }}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                component='button'
                type='button'
                variant='body2'
                underline='hover'
                onClick={() => navigate('/forgotPassword')}
              >
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link
                component='button'
                type='button'
                variant='body2'
                underline='hover'
                onClick={() => navigate('/register')}
              >
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>

        {
          showLoadingSpinner && (
            <Grid container direction='column' alignItems='center' sx={{ pt: 10 }} spacing={0.8}>
              <Grid item>
                <PuffLoader loading={showLoadingSpinner} size={40} color={theme.palette.info.main} />
              </Grid>

              <Grid item>
                <Typography>Logging in</Typography>
              </Grid>
            </Grid>
          )
        }
      </Box>
    </Container>
  );
}

export default Login;
