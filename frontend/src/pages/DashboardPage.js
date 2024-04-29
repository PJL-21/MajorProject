import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, TextField, MenuItem, Button, Card, CardContent, Grid } from '@material-ui/core';
import { useAuth } from '../components/AuthProvider';

const DashboardPage = () => {
  const { user } = useAuth();
  const [inProgressExpenses, setInProgressExpenses] = useState([]);
  const [completedExpenses, setCompletedExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    expenseType: '',
    progress: 'in_progress',
    amount: '',
    createdBy: user.name,
    createdAt: '',
    updatedAt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const refreshExpenses = () => {
    const token = localStorage.getItem("token")
  
      // Fetch updated expenses
      axios.get('http://localhost:5001/api/expenses', {headers:{authorization:token}}).then((response)=>{
        // Filter expenses based on progress
      const inProgress = response.data.filter(expense => expense.progress === 'in_progress');
      const completed = response.data.filter(expense => expense.progress === 'completed');
  
      // Update state with updated expenses
      setInProgressExpenses(inProgress);
      setCompletedExpenses(completed);
      })
  }

  useEffect(() => {
    refreshExpenses()
    },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include user information in the expense data
      const expenseData = {
        ...formData,
        createdBy: user.name, // Include the user's name
        user: user._id, // Include the user's ID
      };
  
      // Submit expense ticket to backend with user information
      const token = localStorage.getItem("token")
      await axios.post('http://localhost:5001/api/expenses', expenseData, {headers:{authorization:token}});

      refreshExpenses()
  
      // Clear form data
      setFormData({
        title: '',
        expenseType: '',
        progress: 'in_progress',
        amount: '',
      });
  
      // Hide the expense form
      setShowExpenseForm(false);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };  

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={10}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4">Dashboard</Typography>
          <Typography variant="h6">Your Expenses</Typography>
          
          {/* In Progress Expenses */}
          <Typography variant="h6">In Progress</Typography>
          <List>
            {inProgressExpenses.map((expense) => (
              <ListItem key={expense._id}>
                <ListItemText primary={expense.title} secondary={`Amount: $${expense.amount}`} />
              </ListItem>
            ))}
          </List>

          {/* Completed Expenses */}
          <Typography variant="h6">Completed</Typography>
          <List>
            {completedExpenses.map((expense) => (
              <ListItem key={expense._id}>
                <ListItemText primary={expense.title} secondary={`Amount: $${expense.amount}`} />
              </ListItem>
            ))}
          </List>

          {/* Add Expense Form Button */}
          <Button variant="contained" color="primary" onClick={() => setShowExpenseForm(true)}>
            Add Expense
          </Button>

          {/* Expense Form Card */}
          {showExpenseForm && (
            <Card style={{ width: '300px', marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h6">Add Expense Ticket</Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="title"
                    label="Expense Title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: '10px' }}
                  />
                  <TextField
                    name="expenseType"
                    label="Expense Type"
                    select
                    value={formData.expenseType}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: '10px' }}
                  >
                    <MenuItem value="Type 1">Type 1</MenuItem>
                    <MenuItem value="Type 2">Type 2</MenuItem>
                    <MenuItem value="Type 3">Type 3</MenuItem>
                  </TextField>
                  <TextField
                    name="budgetCode"
                    label="Budget Code"
                    select
                    value={formData.budgetCode}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: '10px' }}
                  >
                    <MenuItem value="Code 1">Type 1</MenuItem>
                    <MenuItem value="Code 2">Type 2</MenuItem>
                    <MenuItem value="Code 3">Type 3</MenuItem>
                  </TextField>
                  <TextField
                    name="amount"
                    label="Expense Amount"
                    type="number"
                    value={formData.amount}
                    onChange={handleChange}
                    fullWidth
                    required
                    style={{ marginBottom: '10px' }}
                  />
                  <Typography variant="body2">Created By: {formData.createdBy}</Typography>
                  <Typography variant="body2">Created At: {formData.createdAt}</Typography>
                  <Typography variant="body2">Updated At: {formData.updatedAt}</Typography>
                  <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                    Add Ticket
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;