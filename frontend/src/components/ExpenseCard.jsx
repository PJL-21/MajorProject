// ExpenseCard.js
import React from "react";
import axios from "axios";
import { Paper, Text, Button } from "@mantine/core";
import { useAuth } from "./AuthProvider";
import { useDraggable } from "@dnd-kit/core";

const ExpenseCard = ({ expense, refreshExpenses }) => {
  const { user } = useAuth();
  const isAdmin = user.role === "admin";
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: expense._id,
    disabled: !isAdmin,
  });

  const onAssignClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: token },
      };
      await axios.put(
        `http://localhost:5001/api/admin/expenses/${expense._id}/assign`,
        undefined,
        config
      );
      refreshExpenses();
    } catch (error) {
      console.error("Error assigning expense:", error);
    }
  };

  const onDragStart = (event) => {
    event.dataTransfer.setData("text/plain", expense._id);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const expenseId = event.dataTransfer.getData("text/plain");
      const updatedExpense = {
        ...expense,
        progress: event.currentTarget.getAttribute("data-progress"),
      };
      await axios.put(
        `http://localhost:5001/api/expenses/${expenseId}`,
        updatedExpense,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      refreshExpenses();
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <Paper
      withBorder
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      p="xs"
      ref={setNodeRef}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      {...listeners}
      {...attributes}
    >
      <Text component="h4" fw={600}>
        {expense.title}
      </Text>
      <Text variant="body2" color="textSecondary" fz="sm">
        Expense Type: {expense.expenseType}
      </Text>
      <Text variant="body2" color="textSecondary" fz="sm">
        Amount: £{expense.amount}
      </Text>
      <Text variant="body2" color="textSecondary" fz="sm">
        Created By: {expense.user.username}
      </Text>
      {isAdmin && (
        <Button size="small" onClick={onAssignClick} variant="default" mt="sm">
          Assign to me
        </Button>
      )}
    </Paper>
  );
};

export default ExpenseCard;
