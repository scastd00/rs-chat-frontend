import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import DegreeService from '../../../services/DegreeService';
import { useStore } from 'react-redux';
import { checkResponse } from '../../../utils';
import { useNavDis } from '../../../hooks/useNavDis';

function CreateDegreeDialog({ open, onClose, addToVisibleList }) {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [degreeProps, setDegreeProps] = useState({ name: '' });

  const handleDegreeCreation = () => {
    if (degreeProps.name.trim().length === 0)
      return;

    DegreeService
      .addDegree({ name: degreeProps.name }, userState.token)
      .then(res => {
        addToVisibleList(JSON.parse(res.data));
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
        <Button color='error' onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateDegreeDialog;
