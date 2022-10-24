import React, { useEffect, useState } from 'react';
import { getWindowSize } from '../utils/constants';

export default function useAdapt() {
  const [direction, setDirection] = useState(getWindowSize().innerWidth > 1000 ? 'row' : 'column');

  useEffect(() => {
    function handleResize() {
      setDirection(getWindowSize().innerWidth > 1000 ? 'row' : 'column');
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  return [direction];
}
