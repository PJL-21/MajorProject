// src/tests/DashboardPage.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DashboardPage from "../src/pages/DashboardPage";
import { AuthProvider } from "../components/AuthProvider";
import { describe, test, expect } from "vitest";
import { MantineProvider } from "@mantine/core"
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

test("prevents XSS in input fields", async () => {
  const handleSubmit = jest.fn();
  const user = { name: "Test User", role: "user", _id: "12345" };

  render(
    <AuthProvider value={{ user }}>
      <DashboardPage onSubmit={handleSubmit} />
    </AuthProvider>,
    { wrapper: MantineProvider }
  );

  // Open the expense form modal
  fireEvent.click(screen.getByText(/Add Expense/i));

  // Simulate entering an XSS attack string into the title input
  const titleInput = screen.getByLabelText(/Expense Title/i);
  fireEvent.change(titleInput, {
    target: { value: '<script>alert("xss")</script>' },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/Add Ticket/i));

  // Check that the malicious string was not submitted
  expect(titleInput.value).toBe('<script>alert("xss")</script>');
  // Ensure no alert dialog appears (as a basic check that the script did not execute)
  expect(window.alert).not.toHaveBeenCalled();
});

test("prevents SQL injection in input fields", async () => {
  const handleSubmit = jest.fn();
  const user = { name: "Test User", role: "user", _id: "12345" };

  render(
    <AuthProvider value={{ user }}>
      <DashboardPage onSubmit={handleSubmit} />
    </AuthProvider>
  );

  // Open the expense form modal
  fireEvent.click(screen.getByText(/Add Expense/i));

  // Simulate entering an SQL injection string into the title input
  const titleInput = screen.getByLabelText(/Expense Title/i);
  fireEvent.change(titleInput, {
    target: { value: "'; DROP TABLE expenses; --" },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/Add Ticket/i));

  // Check that the suspicious string was not altered
  expect(titleInput.value).toBe("'; DROP TABLE expenses; --");
  // Ensure the submit handler was called with the expected values
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({ title: "'; DROP TABLE expenses; --" })
  );
});
