import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { goBackChat, goForwardChat } from '../actions';
import { connect } from 'react-redux';

function UndoRedoButtons(props) {
  function handleUndo() {
    props.onUndo();
    setTimeout(() => {
      console.log(props.chat.present.present);
    }, 200);
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton onClick={handleUndo}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={props.onRedo}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    chat: state.chat,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => {
      dispatch(goBackChat());
    },
    onRedo: () => {
      dispatch(goForwardChat());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedoButtons);
