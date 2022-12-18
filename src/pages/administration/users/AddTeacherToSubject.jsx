import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';

function AddTeacherToSubject() {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <Container component='main' sx={{ py: 1 }}>
      <CssBaseline />

      <Typography variant='h4' gutterBottom>
        Add teacher to subject
      </Typography>
    </Container>
  );
}

export default AddTeacherToSubject;
