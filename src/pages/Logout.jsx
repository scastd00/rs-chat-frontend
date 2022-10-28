import React, { useState } from 'react';
import { Button, Checkbox, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavDis } from '../hooks/useNavDis';
import { logOut } from '../actions';
import AuthService from '../services/AuthService';
import { useStore } from 'react-redux';
import { checkResponse } from '../utils';

function Logout() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [logOutFromAllSessions, setLogOutFromAllSessions] = useState(false);

  function handleLogout() {
    AuthService
      .logout(userState.token, logOutFromAllSessions)
      .catch(err => checkResponse(err, navigate, dispatch));

    dispatch(logOut());
    navigate('/login');
  }

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h4'>
            Log out
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='body1'>
            Do you want to log out from all sessions?
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='body1'>
            <Checkbox
              checked={logOutFromAllSessions}
              onChange={() => setLogOutFromAllSessions(!logOutFromAllSessions)}
            />
            Log out from all sessions
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant='body1'>
            <Button
              variant='contained'
              color='success'
              onClick={handleLogout}
            >
              Log out
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant='contained'
              color='error'
              onClick={() => navigate('/home')}
            >
              Cancel
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Logout;
