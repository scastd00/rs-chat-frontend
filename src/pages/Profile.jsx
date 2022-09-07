import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useDispatch, useStore } from 'react-redux';
import UserService from '../services/UserService';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';
import DropDown from '../components/DropDown';
import SnackAlert from '../components/SnackAlert';
import AuthService from '../services/AuthService';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useStore().getState();
  const dividerSx = { my: 2, opacity: 1 };

  const [sessions, setSessions] = useState([]);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordChange, setPasswordChange] = useState('');
  const [passwordChangeConfirm, setPasswordChangeConfirm] = useState('');
  const [changePasswordAlertOpen, setChangePasswordAlertOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    UserService
      .openedSessions(state.user.user.username, state.user.tokens.accessToken)
      .then((res) => {
        setSessions(res.data.sessions);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  function handleSendChangePassword() {
    const pass = passwordChange.trim();
    const confirmPass = passwordChangeConfirm.trim();

    if (pass.length === 0 && confirmPass.length === 0) {
      const timeout = setTimeout(() => {
        setChangePasswordAlertOpen(false);
        clearTimeout(timeout);
      }, 2500);

      setChangePasswordAlertOpen(true);
      setPasswordError('Passwords are empty');

      return;
    }

    if (pass !== confirmPass) {
      const timeout = setTimeout(() => {
        setChangePasswordAlertOpen(false);
        clearTimeout(timeout);
      }, 2500);

      setChangePasswordAlertOpen(true);
      setPasswordError('Passwords do not match');

      return;
    }

    AuthService
      .changePassword(state.user.user.username,
        pass,
        confirmPass,
        state.user.tokens.accessToken)
      .then(_ => { // We do not return passwords from server
        closePasswordChangeDialog();
      })
      .catch(e => {
        console.log('Error in passwords', e.response.data.message);
      });
  }

  function closePasswordChangeDialog() {
    setShowPasswordDialog(false);
    setPasswordChange('');
    setPasswordChangeConfirm('');
  }

  return (
    <Container sx={{ pt: 2 }}>
      <CssBaseline />

      <Grid container direction='column'>
        <Grid item>
          <Typography variant='h3'>My profile</Typography>
        </Grid>

        <Divider sx={dividerSx} />

        <Grid item container direction='column' spacing={1.5}>
          <Grid item>
            <Typography sx={{ fontSize: 18 }}>
              Username: {state.user.user.username} ({state.user.user.role})
            </Typography>
          </Grid>

          <Grid item>
            <Typography sx={{ fontSize: 18 }}>
              Full name: {state.user.user.fullName}
            </Typography>
          </Grid>

          <Grid item>
            <Typography sx={{ fontSize: 18 }}>
              Email: {state.user.user.email}
            </Typography>
          </Grid>

          <Grid item>
            <Typography sx={{ fontSize: 18 }}>
              Password: *****
              <Button
                size='small'
                sx={{ ml: 2 }}
                onClick={() => setShowPasswordDialog(true)}
              >
                Change
              </Button>
            </Typography>

            <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
              <DialogTitle>Change password</DialogTitle>

              <DialogContent>
                <Grid container direction='column'>
                  <Grid item>
                    <TextField
                      autoFocus
                      margin='dense'
                      id='NewPassword'
                      label='New password'
                      type='password'
                      fullWidth
                      onChange={(e) => setPasswordChange(e.target.value)}
                    />
                  </Grid>

                  <Grid item>
                    <TextField
                      margin='dense'
                      id='NewPasswordConfirm'
                      label='Confirm new password'
                      type='password'
                      fullWidth
                      onChange={(e) => setPasswordChangeConfirm(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </DialogContent>

              <DialogActions>
                <Button onClick={closePasswordChangeDialog} color='error'>
                  Cancel
                </Button>

                <Button onClick={handleSendChangePassword} color='success'>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            <SnackAlert open={changePasswordAlertOpen} severity='error'>
              <Typography>{passwordError}</Typography>
            </SnackAlert>
          </Grid>
        </Grid>

        <Divider sx={dividerSx} />

        <DropDown title='Opened sessions'>
          <List>
            {
              sessions.map((session, index) => (
                React.cloneElement(
                  <ListItem key={index} sx={{ height: 30 }}>
                    <ListItemIcon sx={{ mr: -2 }}>
                      <ArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={session} />
                  </ListItem>,
                )
              ))
            }
          </List>
        </DropDown>
      </Grid>
    </Container>
  );
}

export default Profile;
