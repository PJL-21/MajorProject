import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, TextField, Button, Container, Box } from '@material-ui/core'; // Import Container and Box from Material-UI
import { useAuth } from '../components/AuthProvider';

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      history.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm"> {/* Add Container with maxWidth="sm" */}
      <Box mt={4} p={3} boxShadow={3} borderRadius={8} textAlign="center"> {/* Add Box with padding, boxShadow, borderRadius, and textAlign */}
        <Typography variant="h4" gutterBottom>Login</Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default LoginPage;
