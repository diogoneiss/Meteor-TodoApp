import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function CenteredLoading({height = "40vh"}) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={height}>
      <CircularProgress />
    </Box>
  );
}

export default CenteredLoading;
