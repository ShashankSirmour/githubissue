import React from 'react';
import Box from '@mui/material/Box';

type ContainerProps = {
  children: React.ReactNode;
};
const Container: React.FC<ContainerProps> = ({
  children,
  ...rest
}: ContainerProps): React.ReactElement => (
  <Box
    maxWidth={{ sm: 720 }}
    width={1}
    margin="0 auto"
    paddingX={2}
    paddingY={{ xs: 4, sm: 6, md: 8 }}
    {...rest}
  >
    {children}
  </Box>
);

export default Container;
