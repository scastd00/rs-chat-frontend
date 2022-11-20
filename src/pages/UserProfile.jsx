import React from 'react';
import { useNavDis } from '../hooks/useNavDis';
import { useParams } from 'react-router';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';

function UserProfile(props) {
  const { username } = useParams();
  const [navigate, dispatch] = useNavDis();

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid container>
        <Grid item>
          <Typography variant='h3'>{username}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserProfile;
