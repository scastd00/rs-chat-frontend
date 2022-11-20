import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, Grid, Popover, Typography } from '@mui/material';
import { COMMANDS } from '../utils/constants';

function CommandPopover({ open, anchorEl, onClose, onCommandClick, currentText }) {
  function showPossibleAutoCompletableCommands() {
    return COMMANDS.filter(command => command.name.startsWith(currentText));
  }

  const [commandsToShow, setCommandsToShow] = useState([]);

  function handleCommandSelection(commandName) {
    onClose();
    onCommandClick(commandName);
  }

  useEffect(() => {
    // Adapts the list of commands to show based on the current text
    setCommandsToShow(showPossibleAutoCompletableCommands());
  }, [currentText]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      sx={{ maxHeight: 400, maxWidth: 500, mt: -1 }}
      disableAutoFocus
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Grid container direction='column'>
        {
          commandsToShow.map((command) => (
            <Grid item key={command.name}>
              <Card sx={{ borderRadius: 0 }} onClick={() => handleCommandSelection(command.name)}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='body1'>
                      /{command.name}
                    </Typography>
                    <Typography variant='caption' color={'text.disabled'}>
                      {command.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Popover>
  );
}

export default CommandPopover;
