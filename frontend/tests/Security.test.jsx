// frontend/src/tests/Security.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardPage from '../src/pages/DashboardPage';
import { describe, test, expect } from "vitest";

describe('Frontend Security Tests', () => {
  test('should prevent XSS in expense title', async () => {
    render(<DashboardPage />);

    const titleInput = screen.getByPlaceholderText('Title');
    userEvent.type(titleInput, "<script>alert('XSS');</script>");

    const submitButton = screen.getByText('Add Ticket');
    userEvent.click(submitButton);

    expect(screen.queryByText("<script>alert('XSS');</script>")).not.toBeInTheDocument();
  });

  test('should escape special characters in input fields', async () => {
    render(<DashboardPage />);

    const titleInput = screen.getByPlaceholderText('Title');
    userEvent.type(titleInput, "O'Reilly");

    const submitButton = screen.getByText('Add Ticket');
    userEvent.click(submitButton);

    expect(screen.getByDisplayValue("O'Reilly")).toBeInTheDocument();
  });
});
