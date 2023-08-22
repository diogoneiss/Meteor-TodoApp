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
import AccountFields from './AccountFields';

export function AccountEdit({ user }) {
  const [userFields, setUserFields] = useState(user);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };


  const handleStatusChange = (newStatus) => {
    setUserFields({ ...userFields, status: newStatus });
  };

  const resetTask = () => {
    let userWithoutPhoto = { ...userFields };
    delete userWithoutPhoto.photo;

    let originalUserWithoutPhoto = { ...user };
    delete originalUserWithoutPhoto.photo;

    console.log(`resetando usuario! era ${JSON.stringify(userWithoutPhoto)} e agora é ${JSON.stringify(originalUserWithoutPhoto)}`)
    setUserFields(user);
  }

  //Duvida: preciso disso?
  useEffect(() => {
    setUserFields(user);
  }, [user]);


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
      <AccountFields hideRegister={true} onSubmit={handleSubmit} user={userFields} disabled={!isEditMode} />

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


const TransitionForm = ({ originalTask, onStatusChange, disabled }) => {
  //Como poderiamos lidar com essa restrição de transição de status?
  const [selectedStatus, setSelectedStatus] = useState(originalTask.status);
  console.log("Status selecionado: ", selectedStatus)

  const handleRadioChange = (event) => {
    setSelectedStatus(event.target.value);
    onStatusChange(event.target.value);
  };

  const determineAllowedStatuses = (status) => {
    switch (status) {
      case taskStatuses.CADASTRADA:
        return [true, true, false];

      case taskStatuses.EM_ANDAMENTO:
        return [true, true, true];

      case taskStatuses.CONCLUIDA:
        return [true, false, true];
      default:
        console.error("Status inválido: ", status)
        return [true, false, false];
    }
  }

  const [allowedStatuses, setAllowedStatuses] = useState(determineAllowedStatuses(originalTask.status));

  useEffect(() => {
    setAllowedStatuses(determineAllowedStatuses(originalTask.status));
    console.log("Status original: ", originalTask, "e allowedStatuses: ",)
    console.log("Status no objeto: ", originalTask.status)
    setSelectedStatus(originalTask.status);
  }, [originalTask]);

  //necessário para resetar o form
  useEffect(() => {
    setSelectedStatus(originalTask.status);
  }, [disabled]);

  return (
    <FormControl component="fieldset">
      <RadioGroup value={selectedStatus} onChange={handleRadioChange}>
        <FormControlLabel
          value={taskStatuses.CADASTRADA}
          control={<Radio />}
          label={taskStatuses.CADASTRADA}
          disabled={disabled || !allowedStatuses[0]}
        />
        <FormControlLabel
          value={taskStatuses.EM_ANDAMENTO}
          control={<Radio />}
          label={taskStatuses.EM_ANDAMENTO}
          disabled={disabled || !allowedStatuses[1]}
        />
        <FormControlLabel
          value={taskStatuses.CONCLUIDA}
          control={<Radio />}
          label={taskStatuses.CONCLUIDA}
          disabled={disabled || !allowedStatuses[2]}
        />
      </RadioGroup>
    </FormControl>
  );
};

const TaskInfo = ({ task }) => {

  const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: pt });
  };

  return (
    <Box>
      <Typography>Tarefa criada {formatRelativeTime(task.createdAt)}</Typography>
      {task.updatedAt && <Typography>Atualizada pela última vez {formatRelativeTime(task.updatedAt)}</Typography>}
    </Box>
  );
};


export default AccountEdit;
