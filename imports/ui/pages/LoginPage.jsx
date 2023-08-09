import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, Container, Alert, Box, Link as MuiLink } from '@mui/material';

import { LoginWithGithub } from '../components/LoginWithGithub';
import { Link, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

export const LoginForm = ({user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const submit = (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Login</Typography>
        
        <Box sx={{ mt: 3, mb: 3 }}>
          <LoginWithGithub style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
        </Box>

        <form onSubmit={submit} noValidate>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Button component={Link} to="/signup" fullWidth variant="outlined" color="primary" sx={{ mt: 2 }}>
            Sign Up Page
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <MuiLink component={Link} to="/reset-password" variant="body2">
              Forgot Password?
            </MuiLink>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
