import React from 'react';
import DropDown from '../DropDown';
import { Grid } from '@mui/material';

function AdministrationUser(props) {
  return (
    <DropDown title='Users' button={props.button}>
      <Grid></Grid>
    </DropDown>
  );
}

export default AdministrationUser;
