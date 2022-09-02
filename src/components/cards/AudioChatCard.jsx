import React from 'react';

function AudioChatCard({ data }) {
  return (
    <audio controls>
      <source src={data.uri} />
    </audio>
  );
}

export default AudioChatCard;
