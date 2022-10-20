import React from 'react';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { useNavDis } from '../../hooks/useNavDis';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';

function Administration() {
  const [navigate] = useNavDis();
  const items = [
    { name: 'degrees', icon: SchoolIcon },
    { name: 'subjects', icon: BookIcon },
    { name: 'groups', icon: GroupsIcon },
    { name: 'users', icon: PersonIcon },
    { name: 'statistics', icon: AnalyticsIcon },
  ]

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid container direction='row' spacing={3}>
        {
          items.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Button
                sx={{ py: 8 }}
                variant='outlined'
                fullWidth
                color='primary'
                onClick={() => navigate(`/administration/${item.name}`)}
              >
                {item.name} &nbsp;&nbsp; {item.icon && <item.icon />}
              </Button>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Administration;
