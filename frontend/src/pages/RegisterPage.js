import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
      <Typography variant="h4">Login</Typography>
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
        label="username"
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={createChangeHandler("username")}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={createChangeHandler("password")}
        fullWidth
        margin="normal"
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      </form>
    </div>
  );
};

export default RegisterPage;
