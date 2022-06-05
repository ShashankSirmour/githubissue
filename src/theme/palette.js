import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#F14050',
    light: '#F14050',

    main: '#F1406C',
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: '#F1406C',
    light: colors.blue.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: white,
    secondary: black,
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F9F1E7',
    paper: '#F9F2E7',
  },
  divider: colors.grey[200],
};
