import React, { useEffect, useState } from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import SubjectService from '../../../services/SubjectService';
import { checkResponse } from '../../../utils';
import { Button, Container, CssBaseline, Grid } from '@mui/material';
import { CreateSubjectDialog } from '../../../components/admin/dialogs';
import { useClipboard } from '../../../hooks/useClipboard';
import { useStore } from 'react-redux';
import DegreeService from '../../../services/DegreeService';
import AdministrationListItem from '../../../components/admin/AdministrationListItem';

function AdministrationSubjects() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  const [allSubjects, setAllSubjects] = useState([]);
  const [allDegrees, setAllDegrees] = useState([]);
  const [createSubjectDialogOpen, setCreateSubjectDialogOpen] = useState(false);

  useEffect(() => {
    SubjectService
      .getAllSubjects(userState.token)
      .then(res => setAllSubjects(res.data))
      .catch(err => checkResponse(err, navigate, dispatch));

    DegreeService
      .getAllDegrees(userState.token)
      .then(res => setAllDegrees(res.data))
      .catch(err => checkResponse(err, navigate, dispatch));
  }, []);

  function handleDeleteSubject(id) {
    SubjectService
      .deleteSubject(id, userState.token)
      .then(() => {
        setAllSubjects(allSubjects.filter(subject => subject.id !== id));
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }

  return (
    <Container>
      <CssBaseline />

      <Button sx={{ mt: 2 }} onClick={() => setCreateSubjectDialogOpen(true)}>Add</Button>

      <Grid container direction='column' py={1} spacing={2}>
        {
          allSubjects.map(subject => (
            <Grid item key={subject.id}>
              <AdministrationListItem
                id={subject.id}
                type='subjects'
                name={subject.name}
                invitationCode={subject.invitationCode}
                deleteFn={() => handleDeleteSubject(subject.id)}
              />
            </Grid>
          ))
        }
      </Grid>

      <CreateSubjectDialog
        open={createSubjectDialogOpen}
        onClose={() => setCreateSubjectDialogOpen(false)}
        addToVisibleList={subject => setAllSubjects([...allSubjects, subject])}
        allDegrees={allDegrees}
      />
    </Container>
  );
}

export default AdministrationSubjects;
