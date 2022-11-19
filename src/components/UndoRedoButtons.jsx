import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { goBackHistory, goForwardHistory } from '../actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function UndoRedoButtons(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleUndo() {
    if (!props.canUndo) {
      return;
    }

    const lastHistoryPath = props.history.past.slice(-1)[0];
    navigate(lastHistoryPath.split('#')[0]);
    dispatch(goBackHistory());
  }

  function handleRedo() {
    if (!props.canRedo) {
      return;
    }

    const nextHistoryPath = props.history.future[0];
    navigate(nextHistoryPath.split('#')[0]);
    dispatch(goForwardHistory());
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton id='goBackButton' onClick={handleUndo} disabled={!props.canUndo}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton id='goForwardButton' onClick={handleRedo} disabled={!props.canRedo}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    history: state.history,
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0,
  };
};

export default connect(mapStateToProps)(UndoRedoButtons);
