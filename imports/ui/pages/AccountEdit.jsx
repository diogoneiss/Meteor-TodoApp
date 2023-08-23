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


  

  const [userFields, setUserFields] = useState(userToState(user));
  const [originalFields, setOriginalFields] = useState(userToState(user));

  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const resetTask = () => {
    let originalUser = userToState(user);
    console.log(originalUser)
    console.log(`resetando usuario! empresa é ${userFields.company} e original é ${originalUser.company} `)

    setUserFields(originalFields);
  }

  //Duvida: preciso disso?
  /*
  useEffect(() => {
    setUserFields(user);
  }, [user]);
*/

  if (error) return <ErrorDisplay message={error.error} severity='error' />;
  if (loading || !userFields) return <CenteredLoading />;



  const handleCancelClick = () => {

    setIsEditMode(false);
    resetTask();

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //TODO: criar metodo de atualizacao
    Meteor.call('tasks.update', userFields, (error) => {
      if (error) {
        console.error(error);
        setError(error.error);
        setFeedback(null);
      } else {
        setIsEditMode(false);
        setError(null);
        setFeedback('Tarefa atualizada com sucesso!');
        setOriginalUser(userFields);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && <ErrorDisplay message={error} />}
      <AccountFields hideRegister={true} onSubmit={handleSubmit} formData={userFields} disabled={!isEditMode} />

      {!isEditMode ?
        <>
          <Button
            sx={{ my: '1rem' }}
            variant="contained"
            fullWidth
            onClick={() => setIsEditMode(true)}
          >
            Editar
          </Button>

        </>
        :
        <Button
          sx={{ my: '1rem' }}
          variant="outlined"
          fullWidth
          onClick={handleCancelClick}
        >
          Cancelar
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
