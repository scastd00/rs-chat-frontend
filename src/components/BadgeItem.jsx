import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function BadgeItem({ title, description, icon }) {
  return (
    <Card sx={{ width: 135 }} elevation={0}>
      <CardMedia
        sx={{ height: 135 }}
        image={icon}
        title={title}
        component='img'
      />

      <CardContent>
        <Typography gutterBottom variant='h5' component='div' align='center'>
          {title}
        </Typography>

        <Typography variant='body2' color='text.secondary' align='center'>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BadgeItem;
