import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material';
import { LoginWithGithub } from '../components/LoginWithGithub';
import { useNavigate } from 'react-router-dom';
import CenteredContainer from '../components/CenteredContainer';
import { AccountStatus, getAccountStatus } from '../utils/accountStatus'
import {userToState, AccountFields} from './AccountFields';

import AlertComponent from '../components/AlertComponent';
const FormHeader = ({ accountStatus }) => (
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

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isGithubOAuth = user && user.profile && user.profile.oauth === 'github';
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

    redirectIfSignedIn();

  }, [user]);


  const submit = (userData) => {

    console.log("Submitted user data: ", userData)
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
    <Container >
      <Container sx={{my: "2rem"}} component="main" maxWidth="md">
        {error && <AlertComponent severity="error" message={error} />}
        <FormHeader accountStatus={accountStatus} />
        <AccountFields hideRegister={isGithubOAuth} onSubmit={submit} formData={user} />
      </Container>
    </Container>
  );
};
