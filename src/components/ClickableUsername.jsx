import React, { useState } from 'react';
import { Button, Container, Divider, Grid, Link, Popover, Typography } from '@mui/material';

function ClickableUsername({ username }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const userActions = [
    { name: 'View profile', action: () => console.log('View profile'), color: 'info' },
    { name: 'Add friend', action: () => console.log('Add friend'), color: 'success' },
    { name: 'Send message', action: () => console.log('Send message'), color: 'success' },
    { name: 'Block user', action: () => console.log('Block user'), color: 'error' },
    { name: 'Report user', action: () => console.log('Report user'), color: 'error' },
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