import { Typography } from '@material-ui/core';
import { ButtonBase } from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';

function DropButton({ title, ...rest }) {
  return (
    <ButtonBase disableRipple {...rest}>
      <Typography style={{ color: '#57606A', fontSize: '0.8rem' }}>
        {title}
      </Typography>
      <ArrowDropDownIcon sx={{ color: '#57606A' }} fontSize="small" />
    </ButtonBase>
  );
}

DropButton.defaultProps = {
  title: '',
};
DropButton.propTypes = {
  title: PropTypes.string,
};

export default DropButton;
