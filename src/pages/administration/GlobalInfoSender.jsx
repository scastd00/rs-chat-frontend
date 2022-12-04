import React, { useContext, useState } from 'react';
import { Button, Checkbox, Container, CssBaseline, Divider, Grid, MenuItem, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { INFO_MESSAGE, MAINTENANCE_MESSAGE, RESTART_MESSAGE } from '../../net/ws/MessageTypes';
import { WebSocketContext } from '../../utils/constants';
import { isoDate } from '../../utils';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function GlobalInfoSender() {
  const [type, setType] = useState('INFO');
  const [message, setMessage] = useState('');
  const [scheduled, setScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(dayjs());
  const client = useContext(WebSocketContext);

  function getMessageTypeFromOption(option) {
    switch (option) {
      case 'INFO':
        return INFO_MESSAGE;
      case 'MAINTENANCE':
        return MAINTENANCE_MESSAGE;
      case 'RESTART':
        return RESTART_MESSAGE;
      default:
        return null;
    }
  }

  function handleSend() {
    const messageType = getMessageTypeFromOption(type);

    if (!messageType) {
      alert('Invalid message type');
      return;
    }

    if (scheduled) {
      client.send(message + '#SCHEDULE#' + isoDate(scheduledTime), messageType);
    } else {
      client.send(message, messageType);
    }

    clearFields();
  }

  function clearFields() {
    setMessage('');
    setScheduled(false);
    setScheduledTime(dayjs());
  }

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />

      <Typography variant='h4' component='h1' gutterBottom sx={{ pb: 2 }}>
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
            <MenuItem value='MAINTENANCE'>Maintenance</MenuItem>
            <MenuItem value='RESTART'>Restart</MenuItem>
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

      <Grid container spacing={3} direction='column'>
        <Grid item>
          <Checkbox
            checked={scheduled}
            onChange={(evt) => setScheduled(evt.target.checked)}
          />

          <Typography variant='body2' component='span' sx={{ pl: 0.5 }}>
            Scheduled
          </Typography>
        </Grid>

        {scheduled &&
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label='Schedule Time'
                value={scheduledTime}
                onChange={setScheduledTime}
                ampm={false}
                disablePast
              />
            </LocalizationProvider>
          </Grid>
        }

        <Grid item>
          <Button variant='contained' onClick={handleSend}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default GlobalInfoSender;
