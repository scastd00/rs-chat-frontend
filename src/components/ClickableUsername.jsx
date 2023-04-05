import React, { useState } from 'react';
import { Button, Container, Divider, Grid, Link, Popover, Typography } from '@mui/material';
import UserService from '../services/UserService';
import { useStore } from 'react-redux';
import { useNavDis } from '../hooks/useNavDis';
import { checkResponse } from '../utils';

function ClickableUsername({ username }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();

  function handleSendMessage() {
    if (username === userState.user.username) {
      return; // Don't allow users to send messages to themselves
    }

    UserService
      .getIdByUsername(username, userState.token)
      .then(res => {
        navigate(`/chat#user-${userState.user.id}_${res.data}`);
      })
      .catch(error => checkResponse(error, navigate, dispatch));
  }

  function handleViewProfile() {
    if (username === userState.user.username) {
      navigate('/profile'); // Don't need to fetch the user's profile if they're viewing their own
      return;
    }

    navigate(`/user/${username}`);
  }

  function handleBlockUser() {

  }

  function handleReportUser() {

  }

  function handleAddFriend() {
    if (username === userState.user.username) {
      return; // Don't allow users to add themselves as friends
    }

    UserService
      .friendSwitch(userState.user.username, username, userState.token)
      .then(res => {
        console.log(res.data); // Todo: Add a snackbar to show that the user was added/removed as a friend
      })
      .catch(error => checkResponse(error, navigate, dispatch));
  }

  const userActions = [
    { name: 'View profile', action: handleViewProfile, color: 'info' },
    { name: 'Add friend', action: handleAddFriend, color: 'success' },
    { name: 'Send message', action: handleSendMessage, color: 'success' },
    { name: 'Block user', action: handleBlockUser, color: 'error' },
    { name: 'Report user', action: handleReportUser, color: 'error' },
  ];

  return (
    <Typography>
      <Link
        component='button'
        type='button'
        variant='body1'
        color='text.primary' // Could make a custom color for this depending on the letters
        underline='hover'
        onClick={(evt) => {
          setAnchorEl(evt.currentTarget);
        }}
      >
        {username}
      </Link>

      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Container
          sx={{
            p: 2,
            bgcolor: 'background.default',
            border: '1px solid',
            borderColor: 'info.main',
            borderRadius: 2,
          }}
        >
          <Typography variant='h5'>
            {username}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Grid container spacing={1} maxWidth={275}>
            {
              userActions.map((action, idx) => (
                <Grid item key={idx}>
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={action.action}
                    color={action.color}
                  >
                    {action.name}
                  </Button>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Popover>
    </Typography>
  );
}

export default ClickableUsername;
