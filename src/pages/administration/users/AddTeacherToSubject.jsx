import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Divider, Grid, TextField, Typography } from '@mui/material';
import TeacherService from '../../../services/TeacherService';
import { useStore } from 'react-redux';
import { checkResponse } from '../../../utils';
import { useNavDis } from '../../../hooks/useNavDis';
import SubjectService from '../../../services/SubjectService';
import ClickableListItem from '../../../components/ClickableListItem';
import SnackAlert from '../../../components/SnackAlert';

function AddTeacherToSubject() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(-1);
  const [selectedSubject, setSelectedSubject] = useState(-1);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [errorSnack, setErrorSnack] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  useEffect(() => {
    setFilteredTeachers(
      teachers.filter(teacher => teacher.fullName.toLowerCase().includes(searchTeacher.toLowerCase())),
    );
  }, [searchTeacher]);

  useEffect(() => {
    setFilteredSubjects(
      subjects.filter(subject => subject.name.toLowerCase().includes(searchSubject.toLowerCase())),
    );
  }, [searchSubject]);

  useEffect(() => {
    TeacherService
      .getAllTeachers(userState.token)
      .then(res => {
        const teachers = res.data;
        setTeachers(teachers);
        setFilteredTeachers(teachers);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });

    SubjectService
      .getAllSubjects(userState.token)
      .then(res => {
        const subjects = res.data;
        setSubjects(subjects);
        setFilteredSubjects(subjects);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  function handleTeacherClick(id) {
    // Deselect old teacher and select new one
    setSelectedTeacher(id);

    // if the selected id is the same, deselect it
    if (id === selectedTeacher) {
      setSelectedTeacher(-1);
    }
  }

  function handleSubjectClick(id) {
    // Deselect old subject and select new one
    setSelectedSubject(id);

    // if the selected id is the same, deselect it
    if (id === selectedSubject) {
      setSelectedSubject(-1);
    }
  }

  function closeSnackbarAfterTimeout() {
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 2500);
  }

  function handleAddTeacherToSubject() {
    TeacherService
      .addTeacherToSubject(selectedTeacher, selectedSubject, userState.token)
      .then(() => {
        setErrorSnack(false);
        setOpenSnackBar(true);
        closeSnackbarAfterTimeout();

        setSelectedTeacher(-1);
        setSelectedSubject(-1);
      })
      .catch(err => {
        setErrorSnack(true);
        setSnackMessage(err.response.data);
        setOpenSnackBar(true);
        closeSnackbarAfterTimeout();

        checkResponse(err, navigate, dispatch);
      });
  }

  return (
    <Container component='main' sx={{ py: 1 }}>
      <CssBaseline />

      <Typography variant='h3' gutterBottom>
        Add teacher to subject
      </Typography>

      {/* Show the selected teacher and subject */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Teacher
          </Typography>
          <Typography variant='body1' gutterBottom>
            {teachers.find(teacher => teacher.id === selectedTeacher)?.fullName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' gutterBottom>
            Subject
          </Typography>
          <Typography variant='body1' gutterBottom>
            {subjects.find(subject => subject.id === selectedSubject)?.name}
          </Typography>
        </Grid>
      </Grid>

      {/* When the selected teacher and subject are different from -1, show a confirm button */}
      {
        selectedTeacher !== -1 && selectedSubject !== -1 && (
          <Typography variant='body1' sx={{ my: 2 }}>
            <Button
              color='success'
              fullWidth
              variant='outlined'
              onClick={handleAddTeacherToSubject}
            >
              Confirm
            </Button>
          </Typography>
        )
      }

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} alignItems='center' sx={{ pb: 1 }}>
            <Grid item>
              <Typography variant='h4'>
                Teachers
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label='Search'
                variant='outlined'
                size='small'
                fullWidth
                onChange={(evt) => setSearchTeacher(evt.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container direction='column' spacing={1}>
            {
              filteredTeachers.map(teacher => (
                <Grid item xs={12} md={6} key={teacher.id}>
                  <ClickableListItem
                    text={teacher.fullName}
                    selected={teacher.id === selectedTeacher}
                    onClick={() => handleTeacherClick(teacher.id)}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={4} alignItems='center' sx={{ pb: 1 }}>
            <Grid item>
              <Typography variant='h4'>
                Subjects
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label='Search'
                variant='outlined'
                size='small'
                fullWidth
                onChange={(evt) => setSearchSubject(evt.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container direction='column' spacing={1}>
            {
              filteredSubjects.map(subject => (
                <Grid item xs={12} md={6} key={subject.id}>
                  <ClickableListItem
                    text={subject.name}
                    selected={subject.id === selectedSubject}
                    onClick={() => handleSubjectClick(subject.id)}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>

      <SnackAlert open={openSnackBar} severity={errorSnack ? 'error' : 'success'}>
        <Typography variant='body1'>
          {errorSnack ? 'Error while adding the teacher: ' + snackMessage : 'Operation completed successfully'}
        </Typography>
      </SnackAlert>
    </Container>
  );
}

export default AddTeacherToSubject;
