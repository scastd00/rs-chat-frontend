import React, { useState } from 'react';
import { CssBaseline, Typography, IconButton, Grid, Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DropDown({ title, children, drop, button }) {
  const [dropped, setDropped] = useState(drop);

  return (
    <CssBaseline>
      <Typography component='main' variant='h5'>
        <IconButton sx={{ mr: 1 }} onClick={() => setDropped(!dropped)}>
          {dropped ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>
        {title}

        {button}
      </Typography>

      {!dropped ? (
        ''
      ) : (
        <Grid container>
          {children?.map((child, index) => {
            return (
              <Grid item xs={12} sx={{ my: 1.5 }} key={index}>
                {child}
              </Grid>
            );
          })}
        </Grid>
      )}
    </CssBaseline>
  );
}

export default DropDown;
