import React, { useState } from 'react';
import { CssBaseline, Grid, IconButton, Typography } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DropDown({ title, children, drop }) {
  const [dropped, setDropped] = useState(drop);

  const childrenToRender =
    typeof children === 'object' ?
      children :
      children?.map((child, index) => {
        return (
          <Grid item key={index}>
            {child}
          </Grid>
        );
      });

  return (
    <CssBaseline>
      <Typography component='main' variant='h5'>
        <IconButton sx={{ mr: 1 }} onClick={() => setDropped(!dropped)}>
          {dropped ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>
        {title}
      </Typography>

      {!dropped ? (
        ''
      ) : (
        <Grid container direction='column' spacing={1} py={1}>
          {childrenToRender}
        </Grid>
      )}
    </CssBaseline>
  );
}

export default DropDown;
