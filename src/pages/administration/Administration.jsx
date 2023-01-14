import React from 'react';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { useNavDis } from '../../hooks/useNavDis';
import BookIcon from '@mui/icons-material/Book';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MessageIcon from '@mui/icons-material/Message';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';

function Administration() {
  const [navigate] = useNavDis();
  const items = [
    { displayName: 'Degrees', route: 'degrees', icon: SchoolIcon },
    { displayName: 'Subjects', route: 'subjects', icon: BookIcon },
    { displayName: 'Groups', route: 'groups', icon: GroupsIcon },
    { displayName: 'Users', route: 'users', icon: PersonIcon },
    { displayName: 'Grafana dashboard', route: 'analytics', icon: AnalyticsIcon },
    { displayName: 'Global info message', route: 'message', icon: MessageIcon },
    { displayName: 'Settings', route: 'settings', icon: SettingsIcon },
    // { displayName: 'About', route: 'about', icon: SettingsIcon },
    // { displayName: 'Help', route: 'help', icon: SettingsIcon },
  ];

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
                onClick={() => navigate(`/administration/${item.route}`)}
              >
                {item.displayName} &nbsp;&nbsp; {item.icon && <item.icon />}
              </Button>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  );
}

export default Administration;
