import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import SubjectService from '../../../services/SubjectService';
import { checkResponse } from '../../../utils';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router';

function CreateSubjectDialog(props) {
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

  const handleSubjectCreation = () => {
    SubjectService
      .addSubject(subjectProps, userState.tokens.accessToken)
      .then(res => {
        console.log(res);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    props.onClose(); // Close the dialog from here
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create degree</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          id='subjectName'
          label='Name'
          margin='dense'
          onChange={(evt) => {
            setSubjectProps({ ...subjectProps, name: evt.target.value });
          }}
        />
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
            setSubjectProps({ ...subjectProps, credits: parseInt(evt.target.value, 10) });
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
            setSubjectProps({ ...subjectProps, grade: parseInt(evt.target.value, 10) });
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
            props.allDegrees.map(degree => (
              React.cloneElement(
                <MenuItem key={degree.id} value={degree.name}>
                  {degree.name}
                </MenuItem>,
              )
            ))
          }
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={handleSubjectCreation}>Ok</Button>
        <Button color='error' onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateSubjectDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  allDegrees: PropTypes.arrayOf(PropTypes.any),
};

export default CreateSubjectDialog;
