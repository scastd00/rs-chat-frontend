import React from 'react';
import DropDown from '../../components/DropDown';
import { Grid, Typography } from '@mui/material';

function AdministrationGroup(props) {
  return (
    <DropDown title='Groups' button={props.button}>
      {
        props.availableGroups.map(group => (
          React.cloneElement(
            <Grid item key={group.id}>
              <Typography>{group.name}</Typography>
            </Grid>,
          )
        ))
      }
    </DropDown>
  );
}

export default AdministrationGroup;
