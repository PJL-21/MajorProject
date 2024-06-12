import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";

const theme = {
  primaryColor: "orange",
  primaryShade: 5,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
