import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginPage } from '../Login';
import { Typography, Container, Box, TextField, FormControlLabel, Switch, Button } from '@mui/material';
import CenteredLoading from '../../components/loading/CenteredLoading';
import { taskStatuses } from '../../../models/taskModel';
import { TodoHeader } from './todoHeader';
import { TASKS_PER_PAGE } from '../../../constants';
import useTaskCounts from '../../utils/taskCountHook';


const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);


const TodoList = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [showUserTasks, setShowUserTasks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  };

  
  const taskCounts = useTaskCounts(searchQuery, showCompleted);
  
  const {totalTaskCount, userTasksCount, _} = taskCounts;


  const totalPages = Math.ceil(totalTaskCount / TASKS_PER_PAGE);
  const existsNextPage =  currentPage < totalPages

  const { tasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }

    const handler = Meteor.subscribe('tasks', currentPage, searchQuery, showCompleted);

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find({}).fetch();

    return { tasks, isLoading: false };
  });

  console.log("Tamanho do tasks: ", tasks.length)

  return (
    <div className="app">
      

      <div className="main">
        <Fragment>
          <TodoHeader searchQuery={searchQuery} showCompleted={showCompleted} userTasksCount={userTasksCount} />
          <TaskForm />
          <Container maxWidth="sm">
            <Box mt={2}>
              <TextField
                label="Buscar tarefas"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                sx={{ marginBottom: '1rem' }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showCompleted}
                    onChange={() => setShowCompleted(!showCompleted)}
                    color="primary"
                  />
                }
                label="Mostrar completas"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showUserTasks}
                    onChange={() => setShowUserTasks(!showUserTasks)}
                    color="primary"
                  />
                }
                label="Mostrar apenas minhas tarefas"
              />
            </Box>
          </Container>
          { /*
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>
            */}

          {isLoading && <CenteredLoading />}

          <ul className="tasks">
            {tasks.map(task => (
              <Task
                key={task._id}
                task={task}
                onDeleteClick={deleteTask}
              />
            ))}
          </ul>
          <Box mt={3} display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}>
              Anterior
            </Button>

            <Typography variant="body1" sx={{ mx: 2 }}>
              Página {currentPage}
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              onClick={handleNextPage}
              disabled={!existsNextPage}>
              Próxima
            </Button>
          </Box>

        </Fragment>

      </div>

    </div>
  );
};

export default TodoList;