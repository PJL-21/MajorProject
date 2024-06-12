import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../src/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "../src/context/AuthContext";
import { describe, test, expect } from "vitest";

test("renders Navbar links", () => {
  render(
    <Router>
      <Navbar />
    </Router>,
    { wrapper: AuthProvider }
  );

  // Check if Dashboard link is rendered
  expect(screen.getByText("Dashboard")).toBeInTheDocument();

  // Check if Expensing Info link is rendered
  expect(screen.getByText("Expensing Info")).toBeInTheDocument();

  // Check if Logout button is rendered
  expect(screen.getByText("Logout")).toBeInTheDocument();
});
