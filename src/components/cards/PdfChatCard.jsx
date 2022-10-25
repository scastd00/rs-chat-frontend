import React from 'react';
import { Grid, Typography } from '@mui/material';

function PdfChatCard({ data }) {
  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
        >
          {data.name} - {data.metadata.size}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PdfChatCard;
