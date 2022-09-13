import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../hooks/useNavDis';
import DegreeService from '../../services/DegreeService';
import { checkResponse } from '../../utils';
import { useStore } from 'react-redux';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import Link from '@mui/material/Link';
import { useClipboard } from '../../hooks/useClipboard';
import { CreateDegreeDialog } from '../../components/admin/dialogs';

function AdministrationDegrees() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  const [allDegrees, setAllDegrees] = useState([]);
  const [createDegreeDialogOpen, setCreateDegreeDialogOpen] = useState(false);

  useEffect(() => {
    DegreeService
      .getAllDegrees(userState.tokens.accessToken)
      .then(res => setAllDegrees(JSON.parse(res.data.degrees)))
      .catch(err => checkResponse(err, navigate, dispatch));
  }, []);


  return (
    <Container>
      <CssBaseline />

      <Button onClick={() => setCreateDegreeDialogOpen(true)}>Add</Button>

      <Grid container sx={{ mx: 6 }} direction='column' spacing={1} py={1}>
        {
          allDegrees.map(deg => (
            <Grid item key={deg.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(deg.invitationCode)}
              >
                {deg.name}
              </Link>
            </Grid>
          ))
        }
      </Grid>

      <CreateDegreeDialog
        open={createDegreeDialogOpen}
        onClose={() => setCreateDegreeDialogOpen(false)}
        onDegreeCreate={(newDegree) => setAllDegrees([...allDegrees, newDegree])}
      />
    </Container>
  );
}

export default AdministrationDegrees;
