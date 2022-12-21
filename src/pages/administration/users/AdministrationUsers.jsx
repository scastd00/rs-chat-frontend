import React from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import { Button, Container, CssBaseline, Grid } from '@mui/material';

function AdministrationUsers() {
  const [navigate] = useNavDis();

  /*
   * Map that allows to create routes inside /administration/users
   * The key is the route path and the value is the button text.
   */
  const userFunctionalities = {
    add: 'Add user',
    list: 'List all users',
    addTeacherToSubject: 'Add teacher to subject',
  };

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid container direction='column' spacing={3}>
        {
          Object.entries(userFunctionalities).map(([key, value]) => (
            <Grid item key={key}>
              <Button
                sx={{ py: 8 }}
                variant='outlined'
                fullWidth
                color='primary'
                onClick={() => navigate(`/administration/users/${key}`)}
              >
                {value}
              </Button>
            </Grid>
          ))
        }
      </Grid>

    </Container>
  );
}

export default AdministrationUsers;
