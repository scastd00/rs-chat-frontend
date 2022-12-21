import React from 'react';
import { Card, CardActionArea, CssBaseline, Typography } from '@mui/material';

function ClickableListItem({ text, selected, onClick }) {
  return (
    <Card sx={{ mx: 2 }} raised={selected}>
      <CardActionArea onClick={onClick}>
        <CssBaseline />

        <Typography variant='body1' sx={{ p: 1.5 }}>
          {text}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default ClickableListItem;
