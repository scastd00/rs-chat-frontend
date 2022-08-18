import React from 'react';
import DropDown from '../../components/DropDown';
import { Grid, Typography } from '@mui/material';

function AdministrationDegree(props) {
  return (
    <DropDown title='Degrees' button={props.button}>
      <Grid container direction='column'>
        {
          props.allDegrees.map(deg => (
            React.cloneElement(
              <Grid item key={deg.id}>
                <Typography>{deg.name}</Typography>
              </Grid>,
            )
          ))
        }
      </Grid>
    </DropDown>
  );
}

export default AdministrationDegree;
