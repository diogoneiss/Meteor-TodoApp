import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, Container, Alert, Box, Link as MuiLink } from '@mui/material';

import { LoginWithGithub } from '../../components/buttons/LoginWithGithub';
import { Link, useNavigate } from 'react-router-dom';
import AlertComponent
  from '../../components/feedback/AlertComponent';

export const LoginPage = ({ user }) => {
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
    setError(null); 

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
          {error && <AlertComponent message={error} severity="error"/>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email ou username"
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
            label="senha"
            type="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
            Fazer login
          </Button>
          <Button component={Link} to="/signup" fullWidth variant="outlined" color="primary" sx={{ mt: 2 }}>
            Criar uma conta
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <MuiLink component={Link} to="/reset-password" variant="body2">
              Esqueci minha senha
            </MuiLink>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;