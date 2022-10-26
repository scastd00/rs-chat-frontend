import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Divider } from '@mui/material';

function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {
        Array.from(new Array(numPages), (_, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1}>
            <Divider sx={{ height: 8 }} />
          </Page>
        ))
      }
    </Document>
  );
}

export default PdfViewer;
