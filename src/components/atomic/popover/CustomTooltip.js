import { Tooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const DefaultTooltip = withStyles({
  tooltip: {
    color: '#fff',
    borderRadius: 0,
    padding: '2px 8px 2px 8px',
    backgroundColor: '#000',
  },
  arrow: {
    '&::before': {
      backgroundColor: '#000',
    },
  },
})(Tooltip);

export default DefaultTooltip;
