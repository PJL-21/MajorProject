import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Text, TextInput, Button, Flex } from "@mantine/core";
import { useAuth } from "../components/AuthProvider";

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(email, password);
      history.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Flex direction="column" gap="md">
        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        {error && <Text c="red">{error}</Text>}
      </Flex>
    </form>
  );
};

export default LoginPage;
