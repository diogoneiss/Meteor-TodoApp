import { Typography, styled } from '@mui/material';

export const ResponsiveTypography = styled(Typography)(({ theme }) => ({

  fontSize: '1.3rem',

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

export default ResponsiveTypography;
