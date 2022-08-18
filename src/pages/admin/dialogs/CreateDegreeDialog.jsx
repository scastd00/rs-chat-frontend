import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import * as PropTypes from 'prop-types';
import React from 'react';

function CreateDegreeDialog(props) {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create degree</DialogTitle>

      <DialogContent>
        <TextField
          required
          fullWidth
          id='DegreeName'
          label='Degree name'
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

CreateDegreeDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default CreateDegreeDialog;
