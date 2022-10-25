import React from 'react';
import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useClipboard } from '../../hooks/useClipboard';
import { useNavDis } from '../../hooks/useNavDis';

function AdministrationListItem({ id, type, name, description, invitationCode, deleteFn }) {
  const [copyToClipboard] = useClipboard();
  const [navigate] = useNavDis();

  return (
    <Grid
      container
      sx={{ border: '1px solid', borderColor: '#505050', borderRadius: '5px', p: 1, px: 2 }}
      alignItems='center'
    >
      <CssBaseline />

      <Grid item xs>
        <Typography>{name}</Typography>
      </Grid>

      <Grid item xs>
        <Typography>{description ?? 'Description unavailable'}</Typography>
      </Grid>

      <Grid item>
        {invitationCode && <Button color='info' onClick={() => copyToClipboard(invitationCode)}>Copy code</Button>}
        <Button onClick={() => navigate(`/administration/${type}/edit/${id}`)}>Edit</Button>
        <Button color='error' onClick={deleteFn}>Delete</Button>
      </Grid>
    </Grid>
  );
}

export default AdministrationListItem;
