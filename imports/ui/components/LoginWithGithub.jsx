import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Box } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';

export const LoginWithGithub = () => {
  const navigate = useNavigate();

  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup'}, (err) => {
        if (err) {
          alert(err)
        } else {
          Meteor.call('user.isFullyRegistered', (error, isFullyRegistered) => {
            console.log("isFullyRegistered: ", !!isFullyRegistered);

            if (error) {
              
            } else if (!!isFullyRegistered) {
              navigate('/');
            } else {
              //add extra fields to profile
              navigate('/signup');
            }
          });
        }
    });
  };

  return (
    <Box my={2}> 
      <Button 
        type="button" 
        variant="outlined" 
        style={{ backgroundColor: '#fff', color: '#000',  borderColor: '#000' }}
        startIcon={<GitHubIcon />} 
        onClick={handleGithubLogin}
        fullWidth
      >
        Login with Github
      </Button>
    </Box>
  );
};
