import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { taskStatuses } from '../../../models/taskModel';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import CenteredLoading from '../../components/loading/CenteredLoading';
import { ArrowForward } from '@mui/icons-material';
import useStatusCount from '../../utils/StatusCountHook';

const WelcomePage = () => {

  const countData = useStatusCount();
 
  const [tasksCount, pendingTasksCount, doingTasksCount, completedTasksCount, isLoading] = Object.values(countData);
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
        height: '60vh',
        marginTop: '1rem',
        marginBottom: '3rem',
      }}
    >
      {isLoading ?
        <CenteredLoading />
        :
        <Box>
          
      
          <Typography variant="h3" align="center" gutterBottom>
            Informações gerais das {tasksCount} tarefas
          </Typography>
          
          <Grid container spacing={3} style={{ flex: '1', alignItems: 'center', marginBottom: '3rem' }}>
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
