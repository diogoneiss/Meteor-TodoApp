import React from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { taskStatuses } from '../../../enums/taskModel';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import CenteredLoading from '../../components/loading/CenteredLoading';
import { ArrowForward } from '@mui/icons-material';
import useStatusCount from '../../utils/StatusCountHook';
import CenteredContainer from '../../components/mui/CenteredContainer';

const WelcomePage = () => {

  const countData = useStatusCount();

  const [tasksCount, pendingTasksCount, doingTasksCount, completedTasksCount, isLoading] = Object.values(countData);
  const boxes = [
    { subtitle: 'Cadastradas', number: pendingTasksCount },
    { subtitle: 'Pendentes', number: doingTasksCount },
    { subtitle: 'Concluidas', number: completedTasksCount },
  ];
    /*
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '60vh',
        marginTop: '1rem',
        marginBottom: '3rem',
      }}
    >
    */
  
  return (

   <CenteredContainer style={{
        display: 'flex',
        flexDirection: 'column',
        height: '60vh',
        marginTop: '1rem',
        marginBottom: '3rem',
        marginRight: '2rem',
        marginLeft: '2rem',
      }}>
      {isLoading ?
        <CenteredLoading />
        :
        <Box>


          <Typography variant="h3" align="center" style={{marginBottom: "2rem"}}>
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
                style={{ padding: '1rem', textAlign: 'center' }}
                endIcon={<ArrowForward />}
              >
                <Typography variant="button">
                  Ver tarefas
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
    </CenteredContainer>
  );
};

export default WelcomePage;
