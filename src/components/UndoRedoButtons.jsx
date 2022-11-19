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
    const element = props.history.past.slice(-1)[0];
    navigate(element);
    dispatch(goBackHistory());
  }

  function handleRedo() {
    const element = props.history.future[0];
    navigate(element);
    dispatch(goForwardHistory());
  }

  return (
    <Grid container spacing={1}>
      <Grid item>
        <IconButton onClick={handleUndo}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={handleRedo}>
          <ArrowForwardIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    history: state.history,
  };
};

export default connect(mapStateToProps)(UndoRedoButtons);
