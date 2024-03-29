import { createTheme } from '@mui/material/styles';
import { breakpointValues } from './constants';

export default createTheme({
  breakpoints: breakpointValues,
  mixins: {
    toolbar: {
      minHeight: 60,
      height: 60,
      maxHeight: 60,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffada5',
    },
    secondary: {
      main: '#66bdbd',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ffa726',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    background: {
      paper: '#121420',
      default: '#121420',
    },
    chatBackground: {
      main: '#0b141a',
    },
    modifiable: {
      main: 'rgba(102,187,106,0.3)',
    },
    notModifiable: {
      main: 'rgba(244,67,54,0.3)',
    },
    footer: {
      main: '#66a4a4',
    },
    message: {
      joined: '#00be1f',
      left: '#f44336',
      info: '#03a9f4',
      error: '#f44336',
      warning: '#ffa726',
    },
    spinner: {
      main: '#29b6f6',
    },
    status: {
      online: '#00be1f',
      away: '#ffa726',
      busy: '#f44336',
      offline: '#bdbdbd',
    },
    mention: {
      self: '#66bb6a',
      other: '#29b6f6',
    },
  },
});
