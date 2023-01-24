import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import DropDown from '../../components/DropDown';
import { useStore } from 'react-redux';
import TeacherService from '../../services/TeacherService';
import { checkResponse } from '../../utils';
import { useNavDis } from '../../hooks/useNavDis';

function TeacherDashboard() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [teacherDegrees, setTeacherDegrees] = useState([]);
  const [teacherSubjects, setTeacherSubjects] = useState([]);

  useEffect(() => {
    TeacherService
      .getTeacherDegrees(userState.user.id, userState.token)
      .then(res => {
        setTeacherDegrees(res.data);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });

    TeacherService
      .getTeacherSubjects(userState.user.id, userState.token)
      .then(res => {
        setTeacherSubjects(res.data);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h3'>Teacher Dashboard</Typography>
      <Typography variant='body2'>
        Welcome to the Teacher Dashboard. Here you can view the degrees you instruct and the courses you
        teach. You can also view the students enrolled in your courses.
      </Typography>

      <Grid container direction='column' spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <DropDown title='Degrees'>
            <Grid container spacing={0} sx={{ pl: 10, pt: 1 }}>
              {
                teacherDegrees.map((degree) => (
                  <Grid item container xs={12} md={4} xl={2} key={degree.id} justifyContent='center'>
                    <Button variant='contained' fullWidth size='small'>{degree.name}</Button>
                  </Grid>
                ))
              }
            </Grid>
          </DropDown>
        </Grid>

        <Grid item>
          <DropDown title='Subjects'>
            <Grid container spacing={2} sx={{ pl: 10, pt: 1 }}>
              {
                teacherSubjects.map((subject) => (
                  <Grid item container xs={12} md={4} xl={2} key={subject.id} justifyContent='center'>
                    <Button variant='contained' fullWidth size='small'>{subject.name}</Button>
                  </Grid>
                ))
              }
            </Grid>
          </DropDown>
        </Grid>
      </Grid>
    </Container>
  );
}

export default TeacherDashboard;
