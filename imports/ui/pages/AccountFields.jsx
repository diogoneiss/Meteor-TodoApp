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
export function userToState(user) {
  const profile = user?.profile || {};

  return {
    name: profile.nome || '',
    dob: profile.dataDeNascimento || '',
    gender: profile.sexo || '',
    company: profile.empresa || '',
    photo: profile.foto || null,
    username: user?.username || '',
    email: profile.email || '',
    password: '',
  };
}
export const AccountFields = ({ formData, onLoad, onSubmit, hideRegister = false, disabled = false }) => {

  const [fields, setFields] = useState(formData);

  console.log("Data inside AccountFields");
  console.log(fields)

  useEffect(() => {
    setFields(formData);
  }, [formData]);

  useEffect(() => {
    if (onLoad) onLoad();
  }, [onLoad]);



  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFields(prevFields => ({ ...prevFields, photo: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field, value) => {
    setFields(prevFields => ({ ...prevFields, [field]: value }));
  };
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(fields);
    }}>
      {!hideRegister && (
        <>
          <TextField fullWidth margin="normal" required label="Email" value={fields.email} onChange={(e) => handleChange('email', e.target.value)} />
          <TextField fullWidth margin="normal" required label="Username" value={fields.username} onChange={(e) => handleChange('username', e.target.value)} />
          <TextField fullWidth margin="normal" required type="password" label="Password" value={fields.password} onChange={(e) => handleChange('password', e.target.value)} />
        </>
      )}
      <TextField disabled={disabled} fullWidth margin="normal" required label="Nome" value={fields.name} onChange={(e) => handleChange('name', e.target.value)} />
      <TextField disabled={disabled} fullWidth margin="normal" required type="date" value={fields.dob} onChange={(e) => handleChange('dob', e.target.value)} />
      <FormControl disabled={disabled} fullWidth margin="normal">
        <InputLabel sx={{ backgroundColor: 'white', paddingLeft: 2, paddingRight: 2 }}>Sexo</InputLabel>
        <Select value={fields.gender} required onChange={(e) => handleChange('gender', e.target.value)}>
          <MenuItem value={'male'}>Masculino</MenuItem>
          <MenuItem value={'female'}>Feminino</MenuItem>
        </Select>
      </FormControl>
      <TextField disabled={disabled} fullWidth margin="normal" required label="Empresa que trabalha" value={fields.company} onChange={(e) => handleChange('company', e.target.value)} />
      <PhotoUploadBox disabled={disabled} photo={fields.photo} onPhotoChange={handlePhotoChange} />

      {!disabled && <Button sx={{ mt: "1rem" }} type="submit" variant="contained" color="primary" fullWidth>Salvar</Button>}

    </form>
  );
};
