import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
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
    <Grid container spacing={0.5} direction='column'>
      <Grid item display='flex'>
        <Typography>Server status</Typography>
        <StatusDot sx={{ color: client.connected ? 'status.online' : 'status.offline' }} />
      </Grid>

      <Grid item display='flex'>
        <Typography>Chat status</Typography>
        <StatusDot sx={{ color: client.connectedToChat ? 'status.online' : 'status.offline' }} />
      </Grid>
    </Grid>
  );
}

export default SocketStatus;
