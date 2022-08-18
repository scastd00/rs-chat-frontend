import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';

function CreateSubjectDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create degree</DialogTitle>

      <DialogContent>
        <TextField required fullWidth id='subjectName' label='Name' margin='dense' onChange={props.onChange} />
        <TextField
          select
          value={props.subjectProps.period}
          required
          fullWidth
          id='subjectPeriod'
          label='Period'
          margin='dense'
          onChange={props.onChange1}
        >
          <MenuItem value='A'>A</MenuItem>
          <MenuItem value='C1'>C1</MenuItem>
          <MenuItem value='C2'>C2</MenuItem>
          <MenuItem value='S1'>S1</MenuItem>
          <MenuItem value='S2'>S2</MenuItem>
        </TextField>
        <TextField
          select
          value={props.subjectProps.type}
          required
          fullWidth
          id='subjectType'
          label='Type'
          margin='dense'
          onChange={props.onChange2}
        >
          <MenuItem value='TR'>TR</MenuItem>
          <MenuItem value='BO'>BO</MenuItem>
          <MenuItem value='OB'>OB</MenuItem>
          <MenuItem value='OP'>OP</MenuItem>
          <MenuItem value='FB'>FB</MenuItem>
        </TextField>
        <TextField
          select
          value={props.subjectProps.credits}
          required
          fullWidth
          id='subjectCredits'
          label='Credits'
          margin='dense'
          onChange={props.onChange3}
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
          value={props.subjectProps.grade}
          required
          fullWidth
          id='subjectGrade'
          label='Grade'
          margin='dense'
          onChange={props.onChange4}
        >
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
          <MenuItem value='4'>4</MenuItem>
        </TextField>
        <TextField
          select
          value={props.subjectProps.degree}
          required
          fullWidth
          id='subjectDegree'
          label='Degree'
          margin='dense'
          onChange={props.onChange5}
        >
          {
            props.availableDegrees.map(props.callbackfn)
          }
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={props.onClick}>Ok</Button>
        <Button color='error' onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateSubjectDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  subjectProps: PropTypes.shape({
    period: PropTypes.string,
    credits: PropTypes.number,
    grade: PropTypes.number,
    name: PropTypes.string,
    degree: PropTypes.string,
    type: PropTypes.string,
  }),
  onChange1: PropTypes.func,
  onChange2: PropTypes.func,
  onChange3: PropTypes.func,
  onChange4: PropTypes.func,
  onChange5: PropTypes.func,
  availableDegrees: PropTypes.arrayOf(PropTypes.any),
  callbackfn: PropTypes.func,
  onClick: PropTypes.func,
};

export default CreateSubjectDialog;
