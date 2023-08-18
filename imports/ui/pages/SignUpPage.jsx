import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material';
import { LoginWithGithub } from '../components/LoginWithGithub';
import { useNavigate } from 'react-router-dom';
import CenteredContainer from '../components/CenteredContainer';
import { AccountStatus, getAccountStatus } from '../utils/accountStatus'


const FormHeader = ({accountStatus}) => (
  <Box mb={2}>
    <Typography align='center' variant='h3' gutterBottom>Cadastro de usuário</Typography>
    {accountStatus === AccountStatus.PARTIAL && 
      <Typography align='center' variant='h4'>Preencha esses dados para completar seu cadastro</Typography>
    }

    {accountStatus === AccountStatus.LOGGED_OUT && 
    <>
      <Typography align='center' variant='h3'>Crie sua conta ou agilize o processo com o Github</Typography>
      <LoginWithGithub /> 
    </> 
    }
  </Box>
);


export const SignupForm = ({ user, accountStatus }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [company, setCompany] = useState('');
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const redirectAfterSignup = () => {
    navigate('/');
  };

  const redirectIfSignedIn = async () => {
    
    console.log("status inside signup: ", accountStatus)
    if (accountStatus === AccountStatus.FULL) {

      redirectAfterSignup();
    }
  }

  useEffect(() => {
    if (user && user.profile) {
      setName(user.profile.nome || '');
      setEmail(user.profile.email || '');
      setDob(user.profile.dataDeNascimento || '');
      setGender(user.profile.sexo || '');
      setCompany(user.profile.empresa || '');
      setPhoto(user.profile.foto || null);
      setUsername(user.username || '');
    }
    console.log("user: ", user);

    redirectIfSignedIn();

  }, [user]);


  const isGithubOAuth = user && user.profile && user.profile.oauth === 'github';


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const userData = { name, dob, gender, company, photo };
    if (!isGithubOAuth) {
      userData.email = email;
      userData.password = password;
      userData.username = username;
    }
    Meteor.call('users.register', userData, (err, res) => {
      if (err) {
        setError(err.message)
      } else {
        setError(null);
        console.log("Response: ", res)
        redirectAfterSignup();
      }
    });
  };

  return (
    <Container>
      <Container my={2} component="main" maxWidth="md">
        <FormHeader accountStatus={accountStatus} />
        <form onSubmit={submit}>
          

          {!isGithubOAuth && (
            <>
            <Box my={5}>
            <TextField fullWidth margin="normal" required label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

              <TextField fullWidth margin="normal" required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <TextField fullWidth margin="normal" required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box></>
          )}
          <TextField fullWidth margin="normal" required label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField fullWidth margin="normal" required type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          <FormControl fullWidth margin="normal">
            <InputLabel sx={{ backgroundColor: 'white', paddingLeft: 2, paddingRight: 2 }}>Sexo</InputLabel>
            <Select value={gender} required onChange={(e) => setGender(e.target.value)}>
              <MenuItem value={'male'}>Masculino</MenuItem>
              <MenuItem value={'female'}>Feminino</MenuItem>
            </Select>
          </FormControl>
          <TextField fullWidth margin="normal" required label="Empresa que trabalha" value={company} onChange={(e) => setCompany(e.target.value)} />

          <Box my={2}>
            <input type="file" required accept="image/*" onChange={handlePhotoChange} />
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Cadastrar
          </Button>
          <Box my={2}>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </form>
      </Container>
    </Container>
  );
};
