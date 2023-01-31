import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Dialog } from '@mui/material';

function ImageChatCard({ data }) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  return (
    <>
      <Card style={{ width: 175, height: 175 }}>
        <CardActionArea>
          <CardMedia
            sx={{ filter: 'blur(5px)' }}
            component='img'
            height='400'
            image={data.path}
            alt={data.name}
            onClick={() => setImageDialogOpen(true)}
          />
        </CardActionArea>
      </Card>

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        fullWidth
        maxWidth={data.metadata.maxWidth}
      >
        <img src={data.path} alt={data.name} />
      </Dialog>
    </>
  );
}

export default ImageChatCard;
