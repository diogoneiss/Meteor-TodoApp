import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { taskStatuses } from '../../models/taskModel';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import CenteredLoading from '../components/CenteredLoading';
import {ArrowForward} from '@mui/icons-material';
const WelcomePage = () => {
  const pendingOnlyFilter = { status: taskStatuses.EM_ANDAMENTO };
  const doingFilter = { status: taskStatuses.CADASTRADA };
  const completedFilter = { status: taskStatuses.CONCLUIDA };

  console.log("pendingOnlyFilter: ", pendingOnlyFilter)

  const { tasksCount, pendingTasksCount, doingTasksCount, completedTasksCount, isLoading } = useTracker(() => {

    const noDataAvailable = {
      tasksCount: 0,
      pendingTasksCount: 0,
      doingTasksCount: 0,
      completedTasksCount: 0
    };

    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find({},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const tasksCount = tasks.length;
    console.log('tasksCount: ', tasksCount)

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    console.log("Tarefas pendentes: ", pendingTasksCount)
    const doingTasksCount = TasksCollection.find(doingFilter).count();
    const completedTasksCount = TasksCollection.find(completedFilter).count();

    const dados = { tasksCount, pendingTasksCount, doingTasksCount, completedTasksCount }

    //console.log(dados)
    return dados;
  });


  const boxes = [
    { subtitle: 'Cadastradas', number: pendingTasksCount },
    { subtitle: 'Pendentes', number: doingTasksCount },
    { subtitle: 'Concluidas', number: completedTasksCount },
  ];

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '60vh', 
      }}
    >
      {isLoading ?
        <CenteredLoading />
        :
        <Box>
          <Typography variant="h3" align="center" gutterBottom>
            Informações gerais das {tasksCount} tarefas
          </Typography>
          <Grid container spacing={3} style={{ flex: '1', alignItems: 'center' }}>
            {boxes.map((box, index) => (
              <Grid item xs={6} key={index}>
                <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
                  <Typography variant="h6">{box.subtitle}</Typography>
                  <Typography variant="h1" style={{ fontWeight: 'bold' }}>
                    {box.number}
                  </Typography>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                component={Link}
                to="/app"
                style={{ padding: '20px', fontSize: '20px', textAlign: 'center' }}
                endIcon={<ArrowForward />}
              >
                Ver tarefas
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
    </Container>
  );
};

export default WelcomePage;
