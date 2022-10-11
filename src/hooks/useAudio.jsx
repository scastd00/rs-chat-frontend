import React, { useEffect, useState } from 'react';

export function useAudio(url) {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      audio.volume = 0.1;
      playing ? audio.play() : audio.pause();
    }, [playing],
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));

    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};
