import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material';

const PhotoUploadBox = ({ photo, onPhotoChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <input type="file" required accept="image/*" onChange={onPhotoChange} />
      {photo && <img src={photo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
    </Box>
  );
};



const AccountFields = ({ user, onLoad, onSubmit, hideRegister=false }) => {
  const [name, setName] = useState(user?.profile?.nome || '');
  const [dob, setDob] = useState(user?.profile?.dataDeNascimento || '');
  const [gender, setGender] = useState(user?.profile?.sexo || '');
  const [company, setCompany] = useState(user?.profile?.empresa || '');
  const [photo, setPhoto] = useState(user?.profile?.foto || null);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.profile?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);

  const isGithubOAuth = user && user.profile && user.profile.oauth === 'github';
  
  //TODO: mostrar foto enviada em miniatura
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

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const dados = {
        name,
        dob,
        gender,
        company,
        photo,
        email,
        password,
        username,
      }
      onSubmit(dados);
    }}>
      {!isGithubOAuth && !hideRegister && (
        <>
          <TextField fullWidth margin="normal" required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField fullWidth margin="normal" required label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField fullWidth margin="normal" required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </>
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
      <PhotoUploadBox photo={photo} onPhotoChange={handlePhotoChange} />


      <Button sx={{mt: "1rem"}} type="submit" variant="contained" color="primary" fullWidth>Cadastrar</Button>
    </form>
  );
};

export default AccountFields;