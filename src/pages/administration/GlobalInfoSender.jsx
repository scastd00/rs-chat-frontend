import React, { useState } from 'react';
import { Button, Checkbox, Container, CssBaseline, Divider, Grid, MenuItem, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

function GlobalInfoSender() {
  const [type, setType] = useState('INFO');
  const [message, setMessage] = useState('');
  const [scheduled, setScheduled] = useState(false);

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h4' component='h1' gutterBottom pb={2}>
        Send Global Info Message
      </Typography>

      <Grid container spacing={3}>
        <Grid item>
          <TextField
            select
            value={type}
            required
            fullWidth
            size='small'
            id='role'
            label='Role'
            onChange={(evt) => setType(evt.target.value)}
          >
            <MenuItem value='INFO'>Info</MenuItem>
            <MenuItem value='WARNING'>Warning</MenuItem>
            <MenuItem value='MAINTENANCE'>Maintenance</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            required
            fullWidth
            size='small'
            id='message'
            label='Message'
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 1, opacity: 0 }} />

      <Grid container spacing={3} direction='row'>
        <Grid item>
          <Checkbox
            checked={scheduled}
            onChange={(evt) => setScheduled(evt.target.checked)}
          />

          <Typography variant='body2' component='span' sx={{ pl: 1 }}>
            Scheduled
          </Typography>
        </Grid>

        {scheduled &&
          <Grid item>
            <TextField
              size='small'
              id='scheduledDate'
              label='Scheduled Date'
              type='datetime-local'
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        }

        <Grid item>
          <Button variant='contained'
                  onClick={() => console.log(message)}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GlobalInfoSender;
