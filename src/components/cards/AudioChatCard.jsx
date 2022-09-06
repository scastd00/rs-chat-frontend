import React from 'react';

function AudioChatCard({ data }) {
  return (
    <audio controls style={{ width: '100%' }}>
      <source src={data.uri} type='audio/mpeg' />
    </audio>
  );
}

export default AudioChatCard;
