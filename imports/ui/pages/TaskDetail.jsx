import React, { useState, useEffect } from 'react';
import { Button, TextField, FormControlLabel, Checkbox, Container } from '@mui/material';
import { spacing } from '@mui/system';

import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';

export function TaskViewEdit() {
  const [task, setTask] = useState(null);
  const [originalTask, setOriginalTask] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false);

  const { taskId } = useParams();

  const resetTask = () => {
    setTask(originalTask);
  }


  const { isLoading, subscriptionError } = useTracker(() => {
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
  if (isLoading || !task) return <div>Carregando...</div>;


  const handleEditClick = () => {
    if (Meteor.userId() === task.userId) {
      if(isEditMode) {
        resetTask();
      }
      setIsEditMode(!isEditMode);
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
        TODO: criar componente para selecionar novos status de acordo com status atual
        */}
        <FormControlLabel
          control={<Checkbox checked={task.isPrivate} disabled={!isEditMode} onChange={(e) => setIsPrivate(setTask({ ...task, isPrivate: e.target.checked }))} />}
          label="Tarefa privada?"
        />

        <Button   
        sx={{ my: '1rem' }}
        
        variant="contained" 
        fullWidth
        onClick={handleEditClick} 
        disabled={Meteor.userId() !== task.userId}>
          {isEditMode ? 'Cancelar' : 'Editar'}
        </Button>

        {isEditMode && (
          <Button  sx={{ my: '1rem' }} type="submit" fullWidth variant="contained" color="success">
            Atualizar
          </Button>
        )}
      </form>
    </Container>
  );
}

export default TaskViewEdit;
