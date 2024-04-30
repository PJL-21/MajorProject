import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@material-ui/core';

const LandingPage = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  const handleRegister = () => {
    history.push('/register');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={3} boxShadow={3} borderRadius={8} textAlign="center">
        <Typography variant="h4" gutterBottom>Welcome to the Expense Tracker</Typography>
        <Typography variant="body1" paragraph>
          Manage your expenses easily with our tool. Login or register to get started!
        </Typography>
        <Box mt={3}>
          <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginRight: 10 }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
