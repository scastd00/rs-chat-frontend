import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../hooks/useNavDis';
import { useStore } from 'react-redux';
import { useClipboard } from '../../hooks/useClipboard';
import GroupService from '../../services/GroupService';
import { checkResponse } from '../../utils';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { CreateGroupDialog } from '../../components/admin/dialogs';
import Link from '@mui/material/Link';

function AdministrationGroups() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  const [allGroups, setAllGroups] = useState([]);
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);

  useEffect(() => {
    GroupService
      .getAllGroups(userState.tokens.accessToken)
      .then(res => setAllGroups(JSON.parse(res.data.groups)))
      .catch(err => checkResponse(err, navigate, dispatch));
  })

  return (
    <Container>
      <CssBaseline />

      <Button onClick={() => setCreateGroupDialogOpen(true)}>Add</Button>

      <Grid container sx={{ mx: 6 }} direction='column' spacing={1} py={1}>
        {
          allGroups.map(group => (
            <Grid item key={group.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(group.invitationCode)}
              >
                {group.name}
              </Link>
            </Grid>
          ))
        }
      </Grid>

      <CreateGroupDialog
        open={createGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
      />
    </Container>
  );
}

export default AdministrationGroups;
