import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import PropTypes from 'prop-types';

function CustomIconButton({ icon, size, children, ...rest }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {matches && (
        <Button startIcon={icon} size={size} {...rest}>
          {children && children}
        </Button>
      )}

      {!matches && (
        <IconButton color="primary" size={size} {...rest}>
          {icon}
        </IconButton>
      )}
    </>
  );
}

CustomIconButton.defaultProps = {
  icon: <AbcIcon />,
  size: 'small',
  children: null,
};
CustomIconButton.propTypes = {
  icon: PropTypes.node,
  size: PropTypes.string,
  children: PropTypes.node,
};

export default CustomIconButton;
