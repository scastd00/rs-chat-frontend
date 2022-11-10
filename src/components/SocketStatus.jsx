import React, { useContext, useEffect, useState } from 'react';
import { Divider, Grid, Icon, Typography } from '@mui/material';
import StatusDot from '../icons/StatusDot';
import { WebSocketContext } from '../utils/constants';

function SocketStatus() {
  const client = useContext(WebSocketContext);
  const [, setConnectionState] = useState({
    toServer: client.connected,
    toChat: client.connectedToChat,
  });

  useEffect(() => {
    // This is a hack to force re-render when the connection state changes
    const interval = setInterval(() => {
      setConnectionState({
        toServer: client.connected,
        toChat: client.connectedToChat,
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Grid container spacing={2} alignItems='center'>
      <Grid item>
        <Typography>Server status</Typography>

        <Grid container alignItems='center' sx={{ color: client.connected ? 'status.online' : 'status.offline' }}>
          <Grid item>
            <Icon>
              <StatusDot />
            </Icon>
          </Grid>

          <Grid item>
            <Typography>
              {client.connected ? 'Connected' : 'Disconnected'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Divider orientation='vertical' />
      </Grid>

      <Grid item>
        <Typography>Chat status</Typography>

        <Grid container alignItems='center' sx={{ color: client.connectedToChat ? 'status.online' : 'status.offline' }}>
          <Grid item>
            <Icon>
              <StatusDot />
            </Icon>
          </Grid>

          <Grid item>
            <Typography>
              {client.connectedToChat ? 'Connected' : 'Disconnected'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SocketStatus;
