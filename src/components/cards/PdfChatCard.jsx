import React, { useState } from 'react';
import { Button, Dialog, Grid, Typography } from '@mui/material';
import PdfViewer from '../PdfViewer';

function PdfChatCard({ data }) {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Button onClick={() => setShowPdf(true)} sx={{ mr: 1 }}>View pdf</Button>
        <Typography variant='caption' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
          {data.name} - {data.metadata.size}
        </Typography>
      </Grid>

      <Dialog open={showPdf} onClose={() => setShowPdf(false)}>
        <PdfViewer pdfUrl={data.uri} />
      </Dialog>
    </Grid>
  );
}

export default PdfChatCard;
