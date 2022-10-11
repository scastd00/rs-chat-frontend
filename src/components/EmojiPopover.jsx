import React from 'react';
import { Grid, IconButton, Popover } from '@mui/material';

function EmojiPopover({ anchorEl, open, onClose, listOfEmojis, addEmojiToTextBox }) {

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onFocusCapture={evt => evt.preventDefault()}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      onClose={() => onClose()}
      sx={{ mt: 1 }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Grid container direction='row' spacing={0.5}>
        {
          listOfEmojis.map(emoji => {
            return (
              <Grid item key={emoji.id}>
                <IconButton onClick={addEmojiToTextBox}>
                  {emoji.icon}
                </IconButton>
              </Grid>
            );
          })
        }
      </Grid>
    </Popover>
  );
}

export default EmojiPopover;
