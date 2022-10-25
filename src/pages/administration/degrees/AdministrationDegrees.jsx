import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import DegreeService from '../../../services/DegreeService';
import { checkResponse } from '../../../utils';
import { useStore } from 'react-redux';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { useClipboard } from '../../../hooks/useClipboard';
import { CreateDegreeDialog } from '../../../components/admin/dialogs';
import AdministrationListItem from '../../../components/admin/AdministrationListItem';

function AdministrationDegrees() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  const [allDegrees, setAllDegrees] = useState([]);
  const [createDegreeDialogOpen, setCreateDegreeDialogOpen] = useState(false);

  useEffect(() => {
    DegreeService
      .getAllDegrees(userState.tokens.accessToken)
      .then(res => {
        setAllDegrees(JSON.parse(res.data.degrees));
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }, []);

  function handleDeleteDegree(id) {
    DegreeService
      .deleteDegree(id, userState.tokens.accessToken)
      .then(() => {
        setAllDegrees(allDegrees.filter(degree => degree.id !== id));
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }

  return (
    <Container>
      <CssBaseline />

      <Button sx={{ mt: 2 }} onClick={() => setCreateDegreeDialogOpen(true)}>Add</Button>

      <Grid container direction='column' py={1} spacing={2}>
        {
          allDegrees.map(degree => (
            <Grid item key={degree.id}>
              <AdministrationListItem
                id={degree.id}
                type='degrees'
                name={degree.name}
                invitationCode={degree.invitationCode}
                deleteFn={() => handleDeleteDegree(degree.id)}
              />
            </Grid>
          ))
        }
      </Grid>

      <CreateDegreeDialog
        open={createDegreeDialogOpen}
        onClose={() => setCreateDegreeDialogOpen(false)}
        addToVisibleList={(newDegree) => setAllDegrees([...allDegrees, newDegree])}
      />
    </Container>
  );
}

export default AdministrationDegrees;
