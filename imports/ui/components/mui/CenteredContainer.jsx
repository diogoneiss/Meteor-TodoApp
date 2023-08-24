import React from 'react';
import { Box } from '@mui/material';

function CenteredContainer({ children, style }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        ...style, 
      }}
    >
      {children}
    </Box>
  );
}

export default CenteredContainer;
