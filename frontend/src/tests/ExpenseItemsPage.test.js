import React from 'react';
import { render, screen } from '@testing-library/react';
import ExpenseItemsPage from './ExpenseItemsPage';

test('renders Expense Items Page', () => {
  render(<ExpenseItemsPage />);

  // Check if Expense Items header is rendered
  expect(screen.getByText('Expense Items')).toBeInTheDocument();

  // Check if Office Items section is rendered
  expect(screen.getByText('Office Items')).toBeInTheDocument();

  // Check if Other Expenses section is rendered
  expect(screen.getByText('Other Expenses')).toBeInTheDocument();
});
