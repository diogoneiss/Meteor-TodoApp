import { createTheme } from '@mui/material/styles';

// 1. Create your theme.
const theme = createTheme();

// 2. Adjust the typography definitions for each heading.
theme.typography.h1 = {
  ...theme.typography.h1,
  fontSize: '2rem',
  '@media (min-width:600px)': {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
};

theme.typography.h2 = {
  ...theme.typography.h2,
  fontSize: '1.75rem',
  '@media (min-width:600px)': {
    fontSize: '2.25rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.75rem',
  },
};

theme.typography.h3 = {
  ...theme.typography.h3,
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
};

theme.typography.h4 = {
  ...theme.typography.h4,
  fontSize: '1.25rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

theme.typography.h5 = {
  ...theme.typography.h5,
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.75rem',
  },
};

theme.typography.h6 = {
  ...theme.typography.h6,
  fontSize: '0.875rem',
  '@media (min-width:600px)': {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

export default theme;
