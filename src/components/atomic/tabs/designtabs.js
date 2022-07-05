import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const GitTabs = styled(Tabs)({
  borderBottom: '1px solid #D0D7DE',
  minHeight: 0,
  '& .MuiTabs-indicator': {
    backgroundColor: '#F5886F',
  },
});

export const GitTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    minHeight: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    color: 'rgba(0, 0, 0, 0.85)',
    '&:hover': {
      color: '#000',
      opacity: 0.9,
    },
    '&.Mui-selected': {
      color: '#000',
      fontWeight: theme.typography.fontWeightMedium,
    },
  }),
);
