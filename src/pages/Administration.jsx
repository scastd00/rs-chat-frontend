import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DegreeService from '../services/DegreeService';
import { useDispatch, useStore } from 'react-redux';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';
import SubjectService from '../services/SubjectService';
import GroupService from '../services/GroupService';
import {
  AdministrationDegree,
  AdministrationGroup,
  AdministrationSubject,
  AdministrationUser,
} from '../components/admin';
import { CreateDegreeDialog, CreateGroupDialog, CreateSubjectDialog } from '../components/admin/dialogs';

function Administration() {
  const [allDegrees, setAllDegrees] = useState([]);
  const [createDegreeDialogOpen, setCreateDegreeDialogOpen] = useState(false);

  const [allSubjects, setAllSubjects] = useState([]);
  const [createSubjectDialogOpen, setCreateSubjectDialogOpen] = useState(false);

  const [allGroups, setAllGroups] = useState([]);
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);

  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    DegreeService
      .getAllDegrees(userState.tokens.accessToken)
      .then(res => {
        setAllDegrees(res.data.degrees);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    SubjectService
      .getAllSubjects(userState.tokens.accessToken)
      .then(res => {
        setAllSubjects(res.data.subjects);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    GroupService
      .getAllGroups(userState.tokens.accessToken)
      .then(res => {
        setAllGroups(res.data.groups);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  function createAddButton(onClickCallback) {
    return (
      <IconButton onClick={onClickCallback} sx={{ mx: 1 }}>
        <AddIcon fontSize='small' />
      </IconButton>
    );
  }

  const degreesButton = createAddButton(() => setCreateDegreeDialogOpen(true));
  const subjectsButton = createAddButton(() => setCreateSubjectDialogOpen(true));
  const groupsButton = createAddButton(() => setCreateGroupDialogOpen(true));
  const usersButton = createAddButton(() => console.log('Pressed'));

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <AdministrationDegree button={degreesButton} allDegrees={allDegrees} />
      <AdministrationSubject button={subjectsButton} allSubjects={allSubjects} />
      <AdministrationGroup button={groupsButton} allGroups={allGroups} />
      <AdministrationUser button={usersButton} />

      <CreateDegreeDialog
        open={createDegreeDialogOpen}
        onClose={() => setCreateDegreeDialogOpen(false)}
        onDegreeCreate={(newDegree) => setAllDegrees([...allDegrees, newDegree])}
      />

      <CreateSubjectDialog
        open={createSubjectDialogOpen}
        onClose={() => setCreateSubjectDialogOpen(false)}
        allDegrees={allDegrees}
      />

      <CreateGroupDialog
        open={createGroupDialogOpen}
        onClose={() => setCreateGroupDialogOpen(false)}
      />
    </Container>
  );
}

export default Administration;
