import React from 'react';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import { useAuth } from '../components/AuthProvider';
import axios from 'axios';

const ExpenseCard = ({expense}) => {
    const { user } = useAuth();
    const onAssignClick = () => {
        const token = localStorage.getItem("token");
        axios.put(`http://localhost:5001/api/admin/expenses/${expense._id}/assign`, undefined, {
            headers: { Authorization: token },
        })
    }
    return(
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {expense.title}
                </Typography>
                <Typography color="textSecondary">
                    Expense Type: {expense.expenseType}
                </Typography>
                <Typography color="textSecondary">
                    Amount: ${expense.amount}
                </Typography>
                <Typography color="textSecondary">
                    Created By: {expense.createdBy}
                </Typography>
                {user.role==='admin' && <Button onClick={onAssignClick}>Assign to me</Button>}
            </CardContent>
        </Card>
    );
};

export default ExpenseCard;