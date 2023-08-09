import React from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  const boxes = [
    { subtitle: 'Subtitle 1', number: 100 },
    { subtitle: 'Subtitle 2', number: 200 },
    { subtitle: 'Subtitle 3', number: 300 },
  ];

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '60vh', // Sets the container height to fill the viewport
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Welcome Message!
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
          >
            Go to Another Page
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
