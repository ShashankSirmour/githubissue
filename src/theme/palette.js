import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: '#57606A',
    dark: '#337AB7',
    light: '#337AB7',

    main: '#337AB7',
  },
  secondary: {
    contrastText: '#57606A',
    dark: colors.blue[900],
    main: '#21CCD1',
    light: colors.blue.A400,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: black,
    secondary: '#57606A',
    link: colors.blue[600],
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#fff',
    paper: '#fff',
    empty: '#f5f5f5',
  },
  divider: colors.grey[200],
};
