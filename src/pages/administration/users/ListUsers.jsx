import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useNavDis } from '../../../hooks/useNavDis';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import UserService from '../../../services/UserService';
import AdministrationListItem from '../../../components/admin/AdministrationListItem';
import { checkResponse } from '../../../utils';

function ListUsers() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService
      .getAll(userState.token)
      .then(res => setUsers(res.data))
      .catch(err => checkResponse(err, dispatch, navigate));
  }, []);

  function handleDeleteUser(id) {
    UserService
      .deleteUser(id, userState.token)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(err => checkResponse(err, dispatch, navigate));
  }

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h3' component='h1' gutterBottom>
        Users (Total: {users.length})
      </Typography>

      <Grid container direction='column' py={1} spacing={2}>
        {
          users.map(user => (
            <Grid item key={user.id}>
              <AdministrationListItem
                id={user.id}
                type='users'
                name={user.username}
                description={'Email: ' + user.email}
                invitationCode={user.username}
                deleteFn={() => handleDeleteUser(user.id)}
              />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default ListUsers;
