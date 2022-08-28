import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, Dialog } from '@mui/material';

function ImageChatCard({ data }) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  const getMaxWidth = () => {
    if (data.metadata.width <= 200 || data.metadata.height <= 200) {
      return 'xs';
    } else if (data.metadata.width <= 500 || data.metadata.height <= 500) {
      return 'sm';
    } else if (data.metadata.width <= 800 || data.metadata.height <= 800) {
      return 'md';
    } else if (data.metadata.width <= 1200 || data.metadata.height <= 1200) {
      return 'lg';
    } else {
      return 'xl';
    }
  };

  return (
    <>
      <Card style={{ width: 175, height: 175 }}>
        <CardActionArea>
          <CardMedia
            sx={{ filter: 'blur(5px)' }}
            component='img'
            height='400'
            image={data.uri}
            alt={data.name}
            onClick={() => setImageDialogOpen(true)}
          />
        </CardActionArea>
      </Card>

      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        fullWidth
        maxWidth={getMaxWidth()}
      >
        <img src={data.uri} alt={data.name} />
      </Dialog>
    </>
  );
}

export default ImageChatCard;
