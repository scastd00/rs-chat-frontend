import React from 'react';
import { Container, CssBaseline, IconButton } from '@mui/material';
import DropDown from '../components/DropDown';
import AddIcon from '@mui/icons-material/Add';

function Administration(props) {
  const degreesButton = (
    <IconButton onClick={() => console.log('Pressed')} sx={{ mx: 1 }}>
      <AddIcon fontSize='small' />
    </IconButton>
  );
  const coursesButton = (
    <IconButton onClick={() => console.log('Pressed')} sx={{ mx: 1 }}>
      <AddIcon fontSize='small' />
    </IconButton>
  );
  const subjectsButton = (
    <IconButton onClick={() => console.log('Pressed')} sx={{ mx: 1 }}>
      <AddIcon fontSize='small' />
    </IconButton>
  );

  return (
    <Container sx={{ py: 3 }}>
      <CssBaseline />

      <DropDown title='Degrees' button={degreesButton}>

      </DropDown>

      <DropDown title='Courses' button={coursesButton}>

      </DropDown>

      <DropDown title='Subjects' button={subjectsButton}>

      </DropDown>
    </Container>
  );
}

export default Administration;
