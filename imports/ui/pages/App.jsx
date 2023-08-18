import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { Task } from '../Task';
import { TaskForm } from '../TaskForm';
import { LoginForm } from './LoginPage';
import {Typography, Container, Box} from '@mui/material';
import CenteredLoading from '../components/CenteredLoading';

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);


const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());
  console.log('user: ', user)

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find({},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });



  return (
    <div className="app">
      <Box marginBottom={3} sx={{ flexGrow: 1 }}>
      <Typography align='center' variant="h3" sx={{ flexGrow: 1 }}>
        📝️ To Do List
        </Typography>
         
      <Typography align='center' variant="h5" sx={{ flexGrow: 1 }}>

      {pendingTasksCount === 0 ? "Você não tem tarefas pendentes" : `Você tem ${pendingTasksCount} tarefas pendentes`}
      </Typography>
      </Box>

      <div className="main">
        {user ? (
          <Fragment>
            <TaskForm />
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
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>

    </div>
  );
};

export default App;