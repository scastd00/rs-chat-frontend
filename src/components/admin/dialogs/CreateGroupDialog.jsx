import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import GroupService from '../../../services/GroupService';
import { checkResponse } from '../../../utils';
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router';

function CreateGroupDialog(props) {
  const [groupProps, setGroupProps] = useState({ name: '' });
  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGroupCreation = () => {
    GroupService
      .addGroup(groupProps, userState.tokens.accessToken)
      .then(res => {
        // Todo: show success alert
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    props.onClose();
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create group</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          autoFocus
          id='GroupName'
          label='Group name'
          margin='dense'
          onChange={(evt) => setGroupProps({ ...groupProps, name: evt.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={handleGroupCreation}>Ok</Button>
        <Button color='error' onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateGroupDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CreateGroupDialog;
