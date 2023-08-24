import React from 'react';
import { Box } from '@mui/material';

function CenteredContainer({ children, style, height="70vh", ...props }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        ...style, 
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export default CenteredContainer;
