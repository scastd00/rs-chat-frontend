import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';

function CreateGroupDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create group</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          id='GroupName'
          label='Group name'
          margin='dense'
          onChange={props.onChange}
        />
      </DialogContent>

      <DialogActions>
        <Button color='success' onClick={props.onClick}>Ok</Button>
        <Button color='error' onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

CreateGroupDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default CreateGroupDialog;
