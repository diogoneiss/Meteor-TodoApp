import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { LoginWithGithub } from '../components/LoginWithGithub';

export const SignupForm = ({ user }) => {
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [company, setCompany] = useState('');
    const [photo, setPhoto] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user && user.profile) {
          setName(user.profile.nome || '');
          setEmail(user.profile.email || '');
          setDob(user.profile.dataDeNascimento || '');
          setGender(user.profile.sexo || '');
          setCompany(user.profile.empresa || '');
          setPhoto(user.profile.foto || null);
        }
        console.log("user: ", user);
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
        }
        Meteor.call('users.register', userData, (err, res) => {
            if (err) {
                // Handle the error
            } else {
                // Redirect or do something with the response
            }
        });
    };

    return (
        <form onSubmit={submit} noValidate>
            <LoginWithGithub />
            <TextField fullWidth required label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField fullWidth required type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            <FormControl fullWidth>
                <InputLabel>Sexo</InputLabel>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <MenuItem value={'male'}>Masculino</MenuItem>
                    <MenuItem value={'female'}>Feminino</MenuItem>
                </Select>
            </FormControl>
            <TextField fullWidth required label="Empresa que trabalha" value={company} onChange={(e) => setCompany(e.target.value)} />
            {!isGithubOAuth && (
              <>
                <TextField fullWidth required label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField fullWidth required type="password" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </>
            )}
            <Box my={2}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </Box>
            <Button type="submit" fullWidth variant="contained" color="primary">
                Sign Up
            </Button>
        </form>
    );
};
