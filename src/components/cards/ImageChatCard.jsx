import React from 'react';

function ImageChatCard({ uri }) {
  return (
    <>
      <img src={uri} style={{ maxWidth: 900 }} alt='' />
    </>
  );
}

export default ImageChatCard;
