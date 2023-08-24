import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Container, RadioGroup, Radio, FormControl, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CenteredLoading from '../../components/loading/CenteredLoading';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { taskStatuses } from '../../../enums/taskModel';
import ErrorDisplay from '../../components/feedback/AlertComponent';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { Task } from '../TodoList/Task';
import {userToState, AccountFields} from '../../components/form/AccountFields';

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
      <Typography variant="h4" align="center" sx={{ my: '1rem' }}>
        Editar dados de cadastro
      </Typography>
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
