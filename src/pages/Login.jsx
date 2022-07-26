import * as React from 'react';
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
import { useNavigate } from 'react-router';
import AuthService from '../services/AuthService';
import { useDispatch } from 'react-redux';
import { setSessionId, setTokens, setUser } from '../actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    AuthService
      .login({
        username: data.get('username'),
        password: data.get('password'),
      })
      .then((res) => {
        const {
          user,
          accessToken,
          refreshToken,
          id,
        } = res.data.session;

        dispatch(setUser(user));
        dispatch(setTokens({ accessToken, refreshToken }));
        dispatch(setSessionId(id));

        navigate('/home');
      })
      .catch((err) => console.log(err));
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
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />

          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          {/*
           Todo: Send API request with true in some field and make JWT token expire later
           */}
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='src/main/react/src/pages/Login#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link component='button' type='button' variant='body2' onClick={() => navigate('/register')}>
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
