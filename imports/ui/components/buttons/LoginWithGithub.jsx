import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Box, Typography, Container } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import {AccountStatus, getAccountStatus} from '../../utils/accountStatus'
export const LoginWithGithub = () => {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup'}, async (err) => {
        if (err) {
          alert(err)
        } else {
          let status = await getAccountStatus();
          console.log("status pela função: ", status);
          if (status === AccountStatus.PARTIAL) {
            navigate('/signup');
          }
          else if (status === AccountStatus.FULL){
            navigate('/');
          }
        }
    });
  };

  return (
    <Box my={2}> 
    <Container maxWidth="xs">
      <Button 
        type="button" 
        variant="outlined" 
        style={{ backgroundColor: '#fff', color: '#000',  borderColor: '#000' }}
        startIcon={<GitHubIcon />} 
        onClick={handleGithubLogin}
        fullWidth
      >
        <Typography variant="button" >
        Entre com seu Github
        </Typography>
      </Button>
    </Container>
    </Box>
  );
};
