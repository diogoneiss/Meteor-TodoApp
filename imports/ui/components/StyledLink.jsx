import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(RouterLink)({
  textDecoration: 'none',
  color: 'inherit',        
  display: 'inline-block',
});

const MuiLink = ({ to, children, ...props }) => {
  return (
    <StyledLink to={to} {...props}>
      {children}
    </StyledLink>
  );
};

export default MuiLink;
