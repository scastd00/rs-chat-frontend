import React, { useState } from 'react';
import { Button, Dialog, Typography } from '@mui/material';
import { Videocam } from '@mui/icons-material';

function VideoChatCard({ data }) {
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

  return (
    <>
      <Button sx={{ color: 'text.primary' }} onClick={() => setVideoDialogOpen(true)}>
        <Videocam />
        &nbsp;
        <Typography variant='body2' component='p'>
          {data.name}
        </Typography>
      </Button>

      <Dialog
        open={videoDialogOpen}
        onClose={() => setVideoDialogOpen(false)}
        fullWidth
        maxWidth='xs'
      >
        <video controls>
          <source src={data.uri} type='video/mp4' />
        </video>
      </Dialog>
    </>
  );
}

export default VideoChatCard;
