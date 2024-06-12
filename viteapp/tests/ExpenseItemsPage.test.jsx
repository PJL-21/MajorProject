import React from "react";
import { render, screen } from "@testing-library/react";
import ExpenseItemsPage from "../src/pages/ExpenseItemsPage";
import { describe, test, expect } from "vitest";
import { MantineProvider } from "@mantine/core";

test("renders Expense Items Page", () => {
  render(<ExpenseItemsPage />, { wrapper: MantineProvider });

  // Check if Expense Items header is rendered
  expect(screen.getByText("Expense Items")).toBeInTheDocument();

  // Check if Office Items section is rendered
  expect(screen.getByText("Office Items")).toBeInTheDocument();

  // Check if Other Expenses section is rendered
  expect(screen.getByText("Other Expenses")).toBeInTheDocument();
});
