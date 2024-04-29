import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

const ExpenseCard = ({expense}) => {
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
            </CardContent>
        </Card>
    );
};

export default ExpenseCard;