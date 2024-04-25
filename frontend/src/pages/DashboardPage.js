import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { useAuth } from '../components/AuthProvider';

const DashboardPage = () => {
  const { user } = useAuth();
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
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h5">Welcome, {user.name}!</Typography>
      <Typography variant="h6">Your Expenses</Typography>
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

export default DashboardPage;