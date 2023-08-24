import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material';
import { LoginWithGithub } from '../../components/buttons/LoginWithGithub';
import { useNavigate } from 'react-router-dom';
import CenteredContainer from '../../components/mui/CenteredContainer';
import { AccountStatus, getAccountStatus } from '../../utils/accountStatus'
import {userToState, AccountFields} from '../../components/form/AccountFields';
import FormHeader from './formHeader';
import AlertComponent from '../../components/feedback/AlertComponent';

export const SignupPage = ({ user, accountStatus }) => {

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

export default SignupPage;
