import React, { useState, useEffect } from 'react';

import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Container, Alert, Typography } from '@mui/material';
import { LoginWithGithub } from '../../components/buttons/LoginWithGithub';
import { AccountStatus, getAccountStatus } from '../../utils/accountStatus'


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

export default FormHeader;