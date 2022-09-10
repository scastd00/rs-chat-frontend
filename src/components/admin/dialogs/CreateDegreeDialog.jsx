import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import DegreeService from '../../../services/DegreeService';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkResponse } from '../../../utils';

function CreateDegreeDialog(props) {
  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [degreeProps, setDegreeProps] = useState({ name: '' });

  const handleDegreeCreation = () => {
    DegreeService
      .addDegree({ name: degreeProps.name }, userState.tokens.accessToken)
      .then(res => {
        props.onDegreeCreate(res.data.degree);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });

    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create degree</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          size='small'
          autoFocus
          id='DegreeName'
          label='Degree name'
          margin='dense'
          onChange={(evt) => setDegreeProps({ ...degreeProps, name: evt.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={handleDegreeCreation}>Ok</Button>
        <Button color='error' onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateDegreeDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onDegreeCreate: PropTypes.func,
};

export default CreateDegreeDialog;
