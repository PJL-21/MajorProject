import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button, Box, Container } from "@material-ui/core"; // Import Container from Material-UI
import { useAuth } from "../components/AuthProvider";
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const history = useHistory();

  const createChangeHandler = (property) => (event) =>
    setFormData((old) => ({ ...old, [property]: event.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", formData);
      console.log(response);
      history.push("/login");
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <Container maxWidth="sm"> {/* Add Container with maxWidth="sm" */}
      <Box mt={4} p={3} boxShadow={3} borderRadius={8} textAlign="center"> {/* Add Box with padding, boxShadow, borderRadius, and textAlign */}
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>Register</Typography>
          <TextField
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={createChangeHandler("email")}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={createChangeHandler("username")}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={createChangeHandler("password")}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
