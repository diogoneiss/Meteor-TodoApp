import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f7f7f7', marginTop: '3rem' }}>
      <Container maxWidth="md">
        <Box textAlign="center" py={3}>
          <Typography variant="subtitle1" gutterBottom>
            Lista avançada de tarefas utilizando MeteorJs, com frontend, backend e banco de dados integrados na mesma aplicação.
            Confira o código fonte em{' '}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Link href="https://github.com/diogoneiss/Meteor-TodoApp" color="primary" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <GitHubIcon fontSize="small" />
                <Typography component="span" style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}>
                  GitHub
                </Typography>
              </Link>
            </Box>

          </Typography>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Diogo Neiss
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
