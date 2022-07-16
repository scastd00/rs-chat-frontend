import React, { useState } from 'react';
import { CssBaseline, Typography, IconButton, Grid } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function DropDown({ title, children, component, variant, drop }) {
  const [dropped, setDropped] = useState(drop);

  return (
    <CssBaseline>
      <Typography component={component} variant={variant}>
        <IconButton sx={{ mr: 1 }} onClick={() => setDropped(!dropped)}>
          {dropped ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </IconButton>
        {title}
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
