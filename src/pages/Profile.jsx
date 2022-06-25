import React, { useEffect, useState } from 'react';
import {
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useStore } from 'react-redux';
import UserService from '../services/UserService';

function Profile() {
  const state = useStore().getState();
  const dividerSx = { my: 2, opacity: 1 };

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    UserService
      .openedSessions(state.user.user.username, state.user.tokens.accessToken)
      .then((res) => {
        setSessions(res.data.sessions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CssBaseline />

      <Container>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='h3'>My profile</Typography>
          </Grid>

          <Divider sx={dividerSx} />

          <Grid item>
            <Typography variant='h5'>
              Opened sessions
            </Typography>

            <Grid container direction='column'>
              <List>
                {
                  sessions.map((session, index) => (
                    <ListItem key={index} sx={{ height: '25px' }}>
                      <ListItemIcon>
                        <ArrowRightIcon />
                      </ListItemIcon>
                      <ListItemText primary={session} />
                    </ListItem>
                  ))
                }
              </List>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
