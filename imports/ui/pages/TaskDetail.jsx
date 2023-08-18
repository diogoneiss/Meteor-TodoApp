import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Container, RadioGroup, Radio, FormControl } from '@mui/material';
import CenteredLoading from '../components/CenteredLoading';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { taskStatuses } from '../../models/taskModel';

export function TaskViewEdit() {
  const [task, setTask] = useState(null);
  const [originalTask, setOriginalTask] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);


  const handleStatusChange = (newStatus) => {
    setTask({ ...task, status: newStatus });
  };

  const { taskId } = useParams();

  const resetTask = () => {
    setTask(originalTask);
  }


  const { isLoading, subscriptionError } = useTracker(() => {
    console.log("Carregando subscription com id ", taskId)
    const subscription = Meteor.subscribe('task.byId', taskId, {
      onStop: (error) => {
        if (error) {
          console.error(`Aconteceu um erro na subscription: ${error.reason}`);
        }
      }
    });

    const taskData = TasksCollection.findOne(taskId);
    if (taskData) {
      setTask(taskData);
      setOriginalTask(taskData);
    }

    return {
      isLoading: !subscription.ready(),
      subscriptionError: subscription.error ? subscription.error.reason : null,
    };
  }, [taskId]);

  if (subscriptionError) return <div>Error: {subscriptionError}</div>;
  if (isLoading || !task) return <CenteredLoading />;


  const handleEditClick = () => {
    if (Meteor.userId() === task.userId) {
      setIsEditMode(true);
    }
  };

  const handleCancelClick = () => {
    if (Meteor.userId() === task.userId) {
      setIsEditMode(false);
      resetTask();
    }
  };

  const handleSubmit = () => {
    // TODO: 
    Meteor.call('tasks.update', task, (error) => {
      if (error) {
        console.error(error);
      } else {
        setIsEditMode(false);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          margin="normal"
          value={task.title}
          disabled={!isEditMode}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          margin="normal"
          value={task.description}
          disabled={!isEditMode}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        {/*
        Detalhe importante: usamos o valor da task original pois o valor da task atual pode ter sido alterado pelo usuário, mas ainda não foi salvo no banco de dados, então a regra de negócio pode ser violada
        */}
        <TransitionForm disabled={!isEditMode} originalStatus={originalTask.status} onStatusChange={handleStatusChange} />


        <FormControlLabel
          control={<Checkbox checked={task.isPrivate} disabled={!isEditMode} onChange={(e) =>
            setTask({ ...task, isPrivate: e.target.checked })}
          />}
          label="Tarefa privada?"
        />

        {!isEditMode ?
          <Button
            sx={{ my: '1rem' }}
            variant="contained"
            fullWidth
            onClick={handleEditClick}
            disabled={Meteor.userId() !== task.userId}>
            Editar
          </Button>
          :
          <Button
            sx={{ my: '1rem' }}
            variant="outlined"
            fullWidth
            onClick={handleCancelClick}
            disabled={Meteor.userId() !== task.userId}
          >
            Cancelar
          </Button>
        }

        {isEditMode && (
          <Button sx={{ my: '1rem' }} type="submit" fullWidth variant="contained">
            Atualizar
          </Button>
        )}
      </form>
    </Container>
  );
}


const TransitionForm = ({originalStatus, onStatusChange, disabled }) => {
  //Como poderiamos lidar com essa restrição de transição de status?
  const [selectedStatus, setSelectedStatus] = useState(originalStatus);

  const handleRadioChange = (event) => {
    setSelectedStatus(event.target.value);
    onStatusChange(event.target.value);
  };

  const [allowedStatuses, setAllowedStatuses] = useState([true, true, false]);

  useEffect(() => {
    switch (originalStatus) {
      case taskStatuses.CADASTRADA:
        setAllowedStatuses([true, true, false]);
        break;
      case taskStatuses.EM_ANDAMENTO:
        setAllowedStatuses([true, true, false]);
        break;
      case taskStatuses.CONCLUIDA:
        setAllowedStatuses([true, false, true]);
        break;
    }
  }, [originalStatus]);

  useEffect(() => {
    setSelectedStatus(originalStatus);
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
          disabled={disabled ||  !allowedStatuses[1]}
        />
        <FormControlLabel
          value={taskStatuses.CONCLUIDA}
          control={<Radio />}
          label={taskStatuses.CONCLUIDA}
          disabled={disabled ||  !allowedStatuses[2]}
        />
      </RadioGroup>
    </FormControl>
  );
};



export default TaskViewEdit;
