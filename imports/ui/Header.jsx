import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/app">App</Button>
          <Button color="inherit" href="/login">Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Header;
