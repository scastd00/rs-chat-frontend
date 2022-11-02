import React from 'react';
import { SvgIcon } from '@mui/material';

function StatusDot(props) {
  return (
    <SvgIcon {...props}>
      <path d='M12 18a6 6 0 100-12 6 6 0 000 12z' />
    </SvgIcon>
  );
}

export default StatusDot;
