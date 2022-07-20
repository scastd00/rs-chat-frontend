import React from 'react';
import { Card } from '@mui/material';

function TextChatCard(props) {
  return (
    <Card sx={{ my: 0.2 }}>
      {props.text}
    </Card>
  );
}

export default TextChatCard;
