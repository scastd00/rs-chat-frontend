import React, { useState } from 'react';
import { CssBaseline, IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function ChatTextBar(props) {
  const [message, setMessage] = useState('');

  function handleSendButton(evt) {
    if (message !== '') {
      evt.currentTarget
         .parentElement
         .parentElement
         .getElementsByTagName('input')[0]
        .focus({ preventScroll: true });
    }

    props.addMessage(message);
    setMessage('');
  }

  function handleSendEnter(evt) {
    if (evt.code === 'Enter') {
      props.addMessage(message);
      setMessage('');
    }
  }

  return (
    <CssBaseline>
      <TextField
        margin='normal'
        size='small'
        fullWidth
        id='Text'
        label='Text'
        name='text'
        color='secondary'
        onKeyDown={handleSendEnter}
        onChange={(evt) => setMessage(evt.target.value)}
        autoFocus
        value={message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleSendButton}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </CssBaseline>
  );
}

export default ChatTextBar;
