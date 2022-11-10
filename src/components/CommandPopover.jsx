import React from 'react';
import { Card, CardActionArea, CardContent, Grid, Popover, Typography } from '@mui/material';
import { COMMANDS } from '../utils/constants';

function CommandPopover({ open, anchorEl, onClose, onCommandClick }) {
  function handleCommandSelection(commandName) {
    onClose();
    onCommandClick(commandName);
  }

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
          COMMANDS.map((command) => (
            <Grid item key={command.name}>
              <Card sx={{ borderRadius: 0 }} onClick={() => handleCommandSelection(command.name)}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant='body1'>
                      /{command.name}
                    </Typography>
                    <Typography variant='caption'>
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
