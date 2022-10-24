import React, { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { useNavDis } from '../../../hooks/useNavDis';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';
import UserService from '../../../services/UserService';
import AdministrationListItem from '../../../components/admin/AdministrationListItem';

function ListUsers() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService
      .getAll(userState.tokens.accessToken)
      .then(res => setUsers(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h3' component='h1' gutterBottom>
        Users (Total: {users.length})
      </Typography>

      <Grid container direction='column' py={1}>
        {
          users.map(user => (
            <Grid item key={user.id}>
              <AdministrationListItem
                id={user.id}
                type='degrees'
                name={user.username}
                description={user.email}
                // deleteFn={() => handleDeleteDegree(user.id)}
              />
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default ListUsers;
