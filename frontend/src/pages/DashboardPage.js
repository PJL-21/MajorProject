import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, Box, Button, Card, CardContent, Grid, TextField, MenuItem } from '@material-ui/core';
import { useAuth } from '../components/AuthProvider';
import ExpenseCard from '../components/ExpenseCard';
import { SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useDroppable, useSortable } from '@dnd-kit/core';

const DashboardPage = () => {
  const { user } = useAuth();
  const [inProgressExpenses, setInProgressExpenses] = useState([]);
  const [submittedExpenses, setSubmittedExpenses] = useState([]);
  const [approvedExpenses, setApprovedExpenses] = useState([]);
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
    const token = localStorage.getItem("token");
  
    // Fetch updated expenses
    axios.get('http://localhost:5001/api/expenses', {headers:{authorization:token}}).then((response)=>{
      // Filter expenses based on progress
      const inProgress = response.data.filter(expense => expense.progress === 'in_progress');
      const submitted = response.data.filter(expense => expense.progress === 'submitted');
      const approved = response.data.filter(expense => expense.progress === 'approved');
      const completed = response.data.filter(expense => expense.progress === 'completed');
  
      // Update state with updated expenses
      setInProgressExpenses(inProgress);
      setSubmittedExpenses(submitted);
      setApprovedExpenses(approved);
      setCompletedExpenses(completed);
    });
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

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
      const token = localStorage.getItem("token");
      await axios.post('http://localhost:5001/api/expenses', expenseData, {headers:{authorization:token}});

      refreshExpenses();
  
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

  const handleDrop = async (event) => {
    const { active, over } = event;
    const activeId = active.id;
    const overId = over.id;
    const expense = inProgressExpenses.find(expense => expense._id === activeId);

    if (activeId !== overId && expense) {
      try {
        const updatedExpense = {
          ...expense,
          progress: overId,
        };

        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5001/api/expenses/${activeId}`, updatedExpense, {headers:{authorization:token}});

        refreshExpenses();
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    }
  };

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={10}>
        <div style={{ padding: '20px' }}>
          <Typography variant="h4">Dashboard</Typography>
          <Typography variant="h6">Your Expenses</Typography>
          
          {/* Box around the expense tickets */}
          <Box border={1} borderRadius={8} borderColor="grey.300" p={2} mt={2} display="flex" overflowX="auto">
            {/* In Progress Expenses */}
            <Box {...useDroppable({ id: 'inProgressDroppable' })} style={{ flex: '1' }} drop={handleDrop}>
              <div {...SortableContext} style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">In Progress</Typography>
                <SortableContext items={inProgressExpenses} strategy={verticalListSortingStrategy}>
                  <List>
                    {inProgressExpenses.map((expense, index) => (
                      <ListItem key={expense._id}>
                        <ExpenseCard expense={expense} index={index} />
                      </ListItem>
                    ))}
                  </List>
                </SortableContext>
              </div>
            </Box>
            {/* Submitted Expenses */}
            <Box {...useDroppable({ id: 'submittedDroppable' })} style={{ flex: '1' }} drop={handleDrop}>
              <div {...SortableContext} style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Submitted</Typography>
                <SortableContext items={submittedExpenses} strategy={verticalListSortingStrategy}>
                  <List>
                    {submittedExpenses.map((expense, index) => (
                      <ListItem key={expense._id}>
                        <ExpenseCard expense={expense} index={index} />
                      </ListItem>
                    ))}
                  </List>
                </SortableContext>
              </div>
            </Box>
            {/* Approved Expenses */}
            <Box {...useDroppable({ id: 'approvedDroppable' })} style={{ flex: '1' }} drop={handleDrop}>
              <div {...SortableContext} style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">Approved</Typography>
                <SortableContext items={approvedExpenses} strategy={verticalListSortingStrategy}>
                  <List>
                    {approvedExpenses.map((expense, index) => (
                      <ListItem key={expense._id}>
                        <ExpenseCard expense={expense} index={index} />
                      </ListItem>
                    ))}
                  </List>
                </SortableContext>
              </div>
            </Box>
            {/* Completed Expenses */}
            <Box>
              <Typography variant="h6">Completed</Typography>
              <List>
                {completedExpenses.map((expense) => (
                  <ListItem key={expense._id}>
                    <ListItemText primary={expense.title} secondary={`Amount: $${expense.amount}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

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
