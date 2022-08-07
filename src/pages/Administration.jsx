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
  TextField,
  Typography,
} from '@mui/material';
import DropDown from '../components/DropDown';
import AddIcon from '@mui/icons-material/Add';
import DegreeService from '../services/DegreeService';
import { useDispatch, useStore } from 'react-redux';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';

function Administration(props) {
  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [createDegreeDialog, setCreateDegreeDialog] = useState(false);
  const [degreeName, setDegreeName] = useState('');
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

  const degreesButton = (
    <IconButton onClick={() => setCreateDegreeDialog(true)} sx={{ mx: 1 }}>
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
  const usersButton = (
    <IconButton onClick={() => console.log('Pressed')} sx={{ mx: 1 }}>
      <AddIcon fontSize='small' />
    </IconButton>
  );

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
          <DropDown title='Courses' button={coursesButton}>

          </DropDown>
        </Grid>
        <Grid item>
          <DropDown title='Subjects' button={subjectsButton}>

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
          <Button onClick={handleDegreeCreation}>Ok</Button>
          <Button onClick={() => setCreateDegreeDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Administration;
