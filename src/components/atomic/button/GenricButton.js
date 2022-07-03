import { Button } from '@mui/material';
import styled from '@emotion/styled';

const GenricButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  color: '#fff',
  fontSize: 24,
  lineHeight: 1.5,
  paddingTop: 8,
  paddingBottom: 8,
  '&:hover': {
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
});

export default GenricButton;
