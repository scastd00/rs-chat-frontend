import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { goBackHistory, goForwardHistory } from '../actions';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function UndoRedoButtons(props) {
  //! ----------------------------
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //! ----------------------------

  function handleUndo() {
    const lastHistoryPath = props.history.past.slice(-1)[0];
    navigate(lastHistoryPath);
    dispatch(goBackHistory());
  }

  function handleRedo() {
    const nextHistoryPath = props.history.future[0];
    navigate(nextHistoryPath);
    dispatch(goForwardHistory());
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton onClick={handleUndo} disabled={!props.canUndo}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleRedo} disabled={!props.canRedo}>
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
