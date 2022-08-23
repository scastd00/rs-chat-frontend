import { Container, Link, Typography } from '@mui/material';
import React from 'react';
import * as PropTypes from 'prop-types';
import { useStore } from 'react-redux';

function ActiveUsers(props) {
  const userState = useStore().getState().user;

  return (
    <Container component='main' sx={{ pt: 1 }}>
      <Typography variant='h5' sx={{ mb: 1 }}>Active users</Typography>

      {
        props.activeUsers.map((username) => {
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

ActiveUsers.propTypes = {
  activeUsers: PropTypes.arrayOf(PropTypes.any),
};

export default ActiveUsers;
