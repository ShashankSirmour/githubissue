import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

function Container({ children, ...rest }) {
  return (
    <Box
      maxWidth={{ sm: 720, md: 1236 }}
      width={1}
      margin="0 auto"
      paddingX={{ xs: 0, sm: 2, md: 10 }}
      {...rest}
    >
      {children}
    </Box>
  );
}

Container.defaultProps = {};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
