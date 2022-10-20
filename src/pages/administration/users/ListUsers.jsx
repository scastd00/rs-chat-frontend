import React from 'react';
import { useStore } from 'react-redux';
import { useNavDis } from '../../../hooks/useNavDis';
import { CssBaseline } from '@mui/material';

function ListUsers(props) {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();

  return (
    <CssBaseline></CssBaseline>
  );
}

export default ListUsers;
