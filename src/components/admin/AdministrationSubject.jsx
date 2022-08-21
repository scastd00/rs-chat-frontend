import React from 'react';
import DropDown from '../DropDown';
import { Grid, Typography } from '@mui/material';

function AdministrationSubject(props) {
  return (
    <DropDown title='Subjects' button={props.button}>
      <Grid container direction='column'>
        {
          props.allSubjects.map(sub => (
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
