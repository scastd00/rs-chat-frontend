import React from 'react';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { useNavDis } from '../hooks/useNavDis';

function Administration() {
  const [navigate] = useNavDis();

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid container direction='row' spacing={3} sx={{ p: 0.5 }}>
        {
          ['degrees', 'subjects', 'groups', 'users', 'statistics'].map((item, index) => (
            <Grid item xs={6} key={index}>
              <Button
                sx={{ py: 8 }}
                variant='outlined'
                fullWidth
                color='primary'
                onClick={() => navigate(`/administration/${item}`)}
              >
                {item}
              </Button>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Administration;
