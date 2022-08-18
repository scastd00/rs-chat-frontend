import React from 'react';
import DropDown from '../../components/DropDown';
import { Grid, Typography } from '@mui/material';

function AdministrationSubject(props) {
  return (
    <DropDown title='Subjects' button={props.button}>
      <Grid container direction='column'>
        {
          props.availableSubjects.map(sub => (
            React.cloneElement(
              <Grid item key={sub.id}>
                <Typography>{sub.name}</Typography>
              </Grid>,
            )
          ))
        }
      </Grid>
    </DropDown>
  );
}

export default AdministrationSubject;
