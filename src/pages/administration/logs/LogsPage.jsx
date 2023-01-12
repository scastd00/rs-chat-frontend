import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import LogService from '../../../services/LogService';
import { checkResponse } from '../../../utils';
import { useNavDis } from '../../../hooks/useNavDis';
import { useStore } from 'react-redux';

function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [navigate, dispatch] = useNavDis();
  const userState = useStore().getState().user;

  useEffect(() => {
    LogService.getAllLogs(userState.token)
      .then((res) => {
        setLogs(JSON.parse(res.data.data));
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  return (
    <Container sx={{ py: 3 }} component='main'>
      <CssBaseline />
      <h1>Logs</h1>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </Container>
  );
}

export default LogsPage;
