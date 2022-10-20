import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import GroupService from '../../../services/GroupService';
import { checkResponse } from '../../../utils';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router';

function CreateGroupDialog({ open, onClose, addToVisibleList }) {
  const [groupProps, setGroupProps] = useState({ name: '' });
  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGroupCreation = () => {
    if (groupProps.name.trim().length === 0)
      return;

    GroupService
      .addGroup(groupProps, userState.tokens.accessToken)
      .then(res => {
        addToVisibleList(JSON.parse(res.data.group));
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create group</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          size='small'
          autoFocus
          id='GroupName'
          label='Group name'
          margin='dense'
          onChange={(evt) => setGroupProps({ ...groupProps, name: evt.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={handleGroupCreation}>Ok</Button>
        <Button color='error' onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGroupDialog;
