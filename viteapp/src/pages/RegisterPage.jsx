import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Text, TextInput, Button, Flex } from "@mantine/core";
import { useAuth } from "../components/AuthProvider";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData
      );
      console.log(response);
      history.push("/login");
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="md">
          <TextInput
            label="Email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={createChangeHandler("email")}
            margin="normal"
            required
          />
          <TextInput
            label="Username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={createChangeHandler("username")}
            margin="normal"
            required
          />
          <TextInput
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={createChangeHandler("password")}
            margin="normal"
            required
          />
          {error && <Text color="error">{error}</Text>}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          {error && <Text color="error">{error}</Text>}
        </Flex>
      </form>
    </div>
  );
};

export default RegisterPage;
