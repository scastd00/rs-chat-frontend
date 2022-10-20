import React from 'react';
import { useNavDis } from '../../../hooks/useNavDis';
import { useStore } from 'react-redux';
import { useClipboard } from '../../../hooks/useClipboard';
import { Container, CssBaseline } from '@mui/material';

function AdministrationStatistics() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [copyToClipboard] = useClipboard();

  return (
    <Container>
      <CssBaseline />
    </Container>
  );
}

export default AdministrationStatistics;
