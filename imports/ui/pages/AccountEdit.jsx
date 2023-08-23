import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Container, RadioGroup, Radio, FormControl, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenteredLoading from '../components/CenteredLoading';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { taskStatuses } from '../../models/taskModel';
import ErrorDisplay from '../components/AlertComponent';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Task } from '../Task';
import {userToState, AccountFields} from './AccountFields';

export function AccountEdit({ user }) {


  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);


  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleEditChange = () => {
    setIsEditMode(!isEditMode);
  }

  const handleSubmit = (userFields) => {
    
    //TODO: criar metodo de atualizacao
    console.log("updated user data form subcomponent ", userFields)

    Meteor.call('users.register', userFields, (err, res) => {
      if (err) {
        setError(err.message)
        setFeedback(null);
      } else {
        setError(null);
        setFeedback("Dados atualizados com sucesso!");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && <ErrorDisplay message={error} />}

      <AccountFields hideRegister={true} onSubmit={handleSubmit} formData={user} disabled={!isEditMode} />

      {!isEditMode ?
        <>
          <Button
            sx={{ my: '1rem' }}
            variant="contained"
            fullWidth
            onClick={handleEditChange}
          >
            Editar
          </Button>

        </>
        :
        <Button
          sx={{ my: '1rem' }}
          variant="outlined"
          fullWidth
          onClick={handleEditChange}
        >
          Sair da edição
        </Button>
      }

      <Container maxWidth="sm" >
        {feedback &&
          <ErrorDisplay message={feedback} severity='success' />
        }
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ my: '1rem' }}
        >
          <Button variant="outlined" color="primary" onClick={handleGoBack} startIcon={<ArrowBackIcon />}>
            Voltar
          </Button>
        </Box>
      </Container>

    </Container>
  );
}

export default AccountEdit;
