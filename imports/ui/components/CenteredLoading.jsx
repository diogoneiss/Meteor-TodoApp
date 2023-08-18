import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function CenteredLoading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
      <CircularProgress />
    </Box>
  );
}

export default CenteredLoading;
