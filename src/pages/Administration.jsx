import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import DropDown from '../components/DropDown';
import AddIcon from '@mui/icons-material/Add';
import DegreeService from '../services/DegreeService';
import { useDispatch, useStore } from 'react-redux';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';

function Administration() {
  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [createDegreeDialog, setCreateDegreeDialog] = useState(false);
  const [degreeName, setDegreeName] = useState('');

  const [createSubjectDialog, setCreateSubjectDialog] = useState(false);
  const [subjectProps, setSubjectProps] = useState({
    name: '',
    period: 'A',
    type: 'TR',
    credits: 6,
    grade: 1,
    degree: '',
  });

  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDegreeCreation = () => {
    DegreeService
      .addDegree({ name: degreeName }, userState.tokens.accessToken)
      .then(res => {
        console.log(res);
      });

    setCreateDegreeDialog(false);
  };

  const handleSubjectCreation = () => {
    console.log(subjectProps);
    setCreateSubjectDialog(false);
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
  }, []);

  function createAddButton(onClickCallback) {
    return (
      <IconButton onClick={onClickCallback} sx={{ mx: 1 }}>
        <AddIcon fontSize='small' />
      </IconButton>
    );
  }

  const degreesButton = createAddButton(() => setCreateDegreeDialog(true));
  const subjectsButton = createAddButton(() => setCreateSubjectDialog(true));
  const groupsButton = createAddButton(() => console.log('Pressed'));
  const usersButton = createAddButton(() => console.log('Pressed'));

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Grid>
        <Grid item>
          <DropDown title='Degrees' button={degreesButton}>
            <Grid container direction='column'>
              {
                availableDegrees.map(deg => (
                  <Grid item key={deg.id}>
                    <Typography>{deg.name}</Typography>
                  </Grid>
                ))
              }
            </Grid>
          </DropDown>
        </Grid>
        <Grid item>
          <DropDown title='Subjects' button={subjectsButton}>

          </DropDown>
        </Grid>
        <Grid item>
          <DropDown title='Groups' button={groupsButton}>

          </DropDown>
        </Grid>
        <Grid item>
          <DropDown title='Users' button={usersButton}>

          </DropDown>
        </Grid>
      </Grid>

      <Dialog open={createDegreeDialog} onClose={() => setCreateDegreeDialog(false)}>
        <DialogTitle>Create degree</DialogTitle>

        <DialogContent>
          <TextField
            required
            fullWidth
            id='DegreeName'
            label='Degree name'
            margin='dense'
            onChange={(evt) => setDegreeName(evt.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button color='success' onClick={handleDegreeCreation}>Ok</Button>
          <Button color='error' onClick={() => setCreateDegreeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createSubjectDialog} onClose={() => setCreateSubjectDialog(false)}>
        <DialogTitle>Create degree</DialogTitle>

        <DialogContent>
          <TextField required fullWidth id='subjectName' label='Name' margin='dense' onChange={(evt) => {
            setSubjectProps({ ...subjectProps, name: evt.target.value });
          }} />
          <TextField
            select
            value={subjectProps.period}
            required
            fullWidth
            id='subjectPeriod'
            label='Period'
            margin='dense'
            onChange={(evt) => {
              setSubjectProps({ ...subjectProps, period: evt.target.value });
            }}
          >
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='C1'>C1</MenuItem>
            <MenuItem value='C2'>C2</MenuItem>
            <MenuItem value='S1'>S1</MenuItem>
            <MenuItem value='S2'>S2</MenuItem>
          </TextField>
          <TextField
            select
            value={subjectProps.type}
            required
            fullWidth
            id='subjectType'
            label='Type'
            margin='dense'
            onChange={(evt) => {
              setSubjectProps({ ...subjectProps, type: evt.target.value });
            }}
          >
            <MenuItem value='TR'>TR</MenuItem>
            <MenuItem value='BO'>BO</MenuItem>
            <MenuItem value='OB'>OB</MenuItem>
            <MenuItem value='OP'>OP</MenuItem>
            <MenuItem value='FB'>FB</MenuItem>
          </TextField>
          <TextField
            select
            value={subjectProps.credits}
            required
            fullWidth
            id='subjectCredits'
            label='Credits'
            margin='dense'
            onChange={(evt) => {
              setSubjectProps({ ...subjectProps, credits: evt.target.value });
            }}
          >
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            <MenuItem value='4'>4</MenuItem>
            <MenuItem value='5'>5</MenuItem>
            <MenuItem value='6'>6</MenuItem>
            <MenuItem value='12'>12 (TFG)</MenuItem>
          </TextField>
          <TextField
            select
            value={subjectProps.grade}
            required
            fullWidth
            id='subjectGrade'
            label='Grade'
            margin='dense'
            onChange={(evt) => {
              setSubjectProps({ ...subjectProps, grade: evt.target.value });
            }}
          >
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
            <MenuItem value='4'>4</MenuItem>
          </TextField>
          <TextField
            select
            value={subjectProps.degree}
            required
            fullWidth
            id='subjectDegree'
            label='Degree'
            margin='dense'
            onChange={(evt) => {
              setSubjectProps({ ...subjectProps, degree: evt.target.value });
            }}
          >
            {
              availableDegrees.map(degree => (
                React.cloneElement(
                  <MenuItem key={degree.id} value={degree.name}>{degree.name}</MenuItem>,
                )
              ))
            }
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button color='success' onClick={handleSubjectCreation}>Ok</Button>
          <Button color='error' onClick={() => setCreateSubjectDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Administration;
