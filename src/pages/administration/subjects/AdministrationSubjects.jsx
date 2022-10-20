import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import SubjectService from '../../../services/SubjectService';
import { checkResponse } from '../../../utils';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import Link from '@mui/material/Link';
import { CreateSubjectDialog } from '../../../components/admin/dialogs';
import { useClipboard } from '../../../hooks/useClipboard';
import { useStore } from 'react-redux';
import DegreeService from '../../../services/DegreeService';

function AdministrationSubjects() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  const [allSubjects, setAllSubjects] = useState([]);
  const [allDegrees, setAllDegrees] = useState([]);
  const [createSubjectDialogOpen, setCreateSubjectDialogOpen] = useState(false);

  useEffect(() => {
    SubjectService
      .getAllSubjects(userState.tokens.accessToken)
      .then(res => setAllSubjects(JSON.parse(res.data.subjects)))
      .catch(err => checkResponse(err, navigate, dispatch));

    DegreeService
      .getAllDegrees(userState.tokens.accessToken)
      .then(res => setAllDegrees(JSON.parse(res.data.degrees)))
      .catch(err => checkResponse(err, navigate, dispatch));
  }, []);

  return (
    <Container>
      <CssBaseline />

      <Button sx={{ mt: 2 }} onClick={() => setCreateSubjectDialogOpen(true)}>Add</Button>

      <Grid container sx={{ mx: 6 }} direction='column' spacing={1} py={1}>
        {
          allSubjects.map(sub => (
            <Grid item key={sub.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(sub.invitationCode)}
              >
                {sub.name}
              </Link>
            </Grid>
          ))
        }
      </Grid>

      <CreateSubjectDialog
        open={createSubjectDialogOpen}
        onClose={() => setCreateSubjectDialogOpen(false)}
        allDegrees={allDegrees}
      />
    </Container>
  );
}

export default AdministrationSubjects;
