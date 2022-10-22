import { Container, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';

function UsersList({ activeUsers, allUsers }) {
  const [typeOfUsers, setTypeOfUsers] = useState('Active');

  function switchUserList() {
    setTypeOfUsers(typeOfUsers === 'Active' ? 'All' : 'Active');
  }

  function userListToShow() {
    return typeOfUsers === 'Active' ? activeUsers : allUsers;
  }

  return (
    <Container component='main' sx={{ py: 1 }}>
      <Grid container spacing={1} justifyContent='flex-start' alignItems='center'>
        <Grid item>
          <IconButton size='small' variant='outlined' onClick={switchUserList}>
            <PeopleIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <Typography variant='h5'>
            {typeOfUsers} users
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 0.5 }} hidden={userListToShow().length === 0} />

      {
        userListToShow().map((username) => {
          // Current user is filtered by the server
          return React.cloneElement(
            <Typography key={username}>
              <b>{'· '}</b>
              <Link
                underline='hover'
                component='button'
                variant='body1'
                color='text.primary'
              >
                {username}
              </Link>
            </Typography>,
          );
        })
      }
    </Container>
  );
}

export default UsersList;
