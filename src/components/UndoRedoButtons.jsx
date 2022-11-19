import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { goBackHistory, goForwardHistory } from '../actions';
import { connect } from 'react-redux';
import { useNavDis } from '../hooks/useNavDis';

function UndoRedoButtons(props) {
  const [navigate] = useNavDis();

  function handleUndo() {
    const element = props.history.past.slice(-1)[0];
    console.log(element);
    navigate('/chat');
    props.onUndo();
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
    history: state.history,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUndo: () => {
      dispatch(goBackHistory());
    },
    onRedo: () => {
      dispatch(goForwardHistory());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedoButtons);
