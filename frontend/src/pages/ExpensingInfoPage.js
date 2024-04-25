import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const ExpensingInfoPage = () => {
  return (
    <div>
      <Typography variant="h4">Expensing Information</Typography>
      <Typography variant="body1">
        Here are some details about different expenses you can claim:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Lunch" secondary="Expense lunch costs incurred during work hours." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Office chair" secondary="Claim the cost of purchasing a new office chair." />
        </ListItem>
        {/* Add more expense details as needed */}
      </List>
    </div>
  );
};

export default ExpensingInfoPage;