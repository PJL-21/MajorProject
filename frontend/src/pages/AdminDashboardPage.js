import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const AdminDashboardPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <Typography variant="h4">Admin Dashboard</Typography>
      <Typography variant="h5">Expenses</Typography>
      <List>
        {expenses.map((expense) => (
          <ListItem key={expense._id}>
            <ListItemText primary={expense.title} secondary={`Amount: $${expense.amount}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AdminDashboardPage;