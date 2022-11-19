import React from 'react';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { goBackChat, goForwardChat } from '../actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

function UndoRedoButtons(props) {
  const navigate = useNavigate();

  function handleUndo() {
    const element = props.chat.past.slice(-1)[0];
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
