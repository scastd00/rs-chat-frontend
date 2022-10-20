import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import { useStore } from 'react-redux';
import { useClipboard } from '../../../hooks/useClipboard';
import GroupService from '../../../services/GroupService';
import { checkResponse } from '../../../utils';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { CreateGroupDialog } from '../../../components/admin/dialogs';
import AdministrationListItem from '../../../components/admin/AdministrationListItem';

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
  }, []);

  return (
    <Container>
      <CssBaseline />

      <Button sx={{ mt: 2 }} onClick={() => setCreateGroupDialogOpen(true)}>Add</Button>

      <Grid container direction='column' py={1}>
        {
          allGroups.map(group => (
            <Grid item key={group.id}>
              <AdministrationListItem
                id={group.id}
                type='groups'
                name={group.name}
                invitationCode={group.invitationCode}
              />
            </Grid>
          ))
        }
      </Grid>

      <CreateGroupDialog
        open={createGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
        addToVisibleList={group => setAllGroups([...allGroups, group])}
      />
    </Container>
  );
}

export default AdministrationGroups;
