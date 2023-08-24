import { createTheme } from '@mui/material/styles';


const theme = createTheme();

function generateTypography(theme, baseSize=1) {

  const variantScales = {
    h1: 2,
    h2: 1.75,
    h3: 1.5,
    h4: 1.25,
    h5: 1,
    h6: 0.875,
    button: 0.7,
  };

  const typography = {};

  for (let variant in variantScales) {
    
    typography[variant] = {
      // herdar as propriedades definidas anteriormente
      ...theme.typography[variant],
      //criar novas propriedades nas escalas desejadas
      fontSize: `${baseSize * variantScales[variant]}rem`,
      '@media (min-width:600px)': {
        fontSize: `${baseSize * variantScales[variant] * 1.25}rem`
      },
      [theme.breakpoints.up('md')]: {
        fontSize: `${baseSize * variantScales[variant] * 1.5}rem`
      }
    };
  }
  return typography;
}

const baseScale = 1; 
const generatedTypography = generateTypography(theme, baseScale);

theme.typography = {
  ...theme.typography,
  ...generatedTypography
};


/*
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
*/
export default theme;
