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
    mode: 'light',
    primary: {
      main: '#2292a4',
    },
    secondary: {
      main: '#483c41',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      paper: '#fafbf3',
      default: '#fafbf3',
    },
    chatBackground: {
      main: '#ede8e0',
    },
    modifiable: {
      main: '#e6ffe3',
    },
    notModifiable: {
      main: '#ffdee4',
    },
    footer: {
      main: '#abc5fc',
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
      online: '#21f848',
      away: '#ffa726',
      busy: '#e54034',
      offline: '#c7c7c7',
    },
    mention: {
      self: '#66bb6a',
      other: '#29b6f6',
    },
  },
});
