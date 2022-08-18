import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Grid, IconButton, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DegreeService from '../../services/DegreeService';
import { useDispatch, useStore } from 'react-redux';
import { checkResponse } from '../../utils';
import { useNavigate } from 'react-router';
import SubjectService from '../../services/SubjectService';
import GroupService from '../../services/GroupService';
import { AdministrationDegree, AdministrationGroup, AdministrationSubject, AdministrationUser } from './index';
import { CreateDegreeDialog, CreateGroupDialog, CreateSubjectDialog } from './dialogs';

function Administration() {
  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [createDegreeDialogOpen, setCreateDegreeDialogOpen] = useState(false);
  const [degreeName, setDegreeName] = useState('');

  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [createSubjectDialogOpen, setCreateSubjectDialogOpen] = useState(false);
  const [subjectProps, setSubjectProps] = useState({
    name: '',
    period: 'A',
    type: 'TR',
    credits: 6,
    grade: 1,
    degree: '',
  });

  const [availableGroups, setAvailableGroups] = useState([]);
  const [createGroupDialog, setCreateGroupDialog] = useState(false);
  const [groupProps, setGroupProps] = useState({ name: '' });

  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDegreeCreation = () => {
    DegreeService
      .addDegree({ name: degreeName }, userState.tokens.accessToken)
      .then(res => {
        setAvailableDegrees([...availableDegrees, res.data.degree]);
      });

    setCreateDegreeDialogOpen(false);
  };

  const handleSubjectCreation = () => {
    SubjectService
      .addSubject(subjectProps, userState.tokens.accessToken)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    setCreateSubjectDialogOpen(false);
  };

  const handleGroupCreation = () => {
    GroupService
      .addGroup(groupProps, userState.tokens.accessToken)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    setCreateGroupDialog(false);
  };

  useEffect(() => {
    DegreeService
      .getAllDegrees(userState.tokens.accessToken)
      .then(res => {
        setAvailableDegrees(res.data.degrees);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    SubjectService
      .getAllSubjects(userState.tokens.accessToken)
      .then(res => {
        setAvailableSubjects(res.data.subjects);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    GroupService
      .getAllGroups(userState.tokens.accessToken)
      .then(res => {
        setAvailableGroups(res.data.groups);
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
  const groupsButton = createAddButton(() => setCreateGroupDialog(true));
  const usersButton = createAddButton(() => console.log('Pressed'));

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid>
        <Grid item>
          <AdministrationDegree button={degreesButton} availableDegrees={availableDegrees} />
        </Grid>
        <Grid item>
          <AdministrationSubject button={subjectsButton} availableSubjects={availableSubjects} />
        </Grid>
        <Grid item>
          <AdministrationGroup button={groupsButton} availableGroups={availableGroups} />
        </Grid>
        <Grid item>
          <AdministrationUser button={usersButton} />
        </Grid>
      </Grid>

      <CreateDegreeDialog open={createDegreeDialogOpen} onClose={() => setCreateDegreeDialogOpen(false)}
                          onChange={(evt) => setDegreeName(evt.target.value)} onClick={handleDegreeCreation} />

      <CreateSubjectDialog
        open={createSubjectDialogOpen}
        onClose={() => setCreateSubjectDialogOpen(false)}
        onChange={(evt) => {
          setSubjectProps({ ...subjectProps, name: evt.target.value });
        }}
        subjectProps={subjectProps}
        onChange1={(evt) => {
          setSubjectProps({ ...subjectProps, period: evt.target.value });
        }}
        onChange2={(evt) => {
          setSubjectProps({ ...subjectProps, type: evt.target.value });
        }}
        onChange3={(evt) => {
          setSubjectProps({ ...subjectProps, credits: parseInt(evt.target.value, 10) });
        }}
        onChange4={(evt) => {
          setSubjectProps({ ...subjectProps, grade: parseInt(evt.target.value, 10) });
        }}
        onChange5={(evt) => {
          setSubjectProps({ ...subjectProps, degree: evt.target.value });
        }}
        availableDegrees={availableDegrees}
        callbackfn={degree => (
          React.cloneElement(
            <MenuItem key={degree.id} value={degree.name}>{degree.name}</MenuItem>,
          )
        )}
        onClick={handleSubjectCreation}
      />

      <CreateGroupDialog
        open={createGroupDialog}
        onClose={() => setCreateGroupDialog(false)}
        onChange={(evt) => setGroupProps({ ...groupProps, name: evt.target.value })}
        onClick={handleGroupCreation}
      />
    </Container>
  );
}

export default Administration;
