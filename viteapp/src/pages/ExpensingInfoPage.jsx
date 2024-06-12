import React from "react";
import { Text, Divider, Paper, List, ListItem } from "@mantine/core";

const ExpensingInfoPage = () => {
  return (
    <div>
      <Text variant="h4" align="center" mt="lg">
        Expensing Information
      </Text>
      <Paper padding="lg" shadow="md" mt="lg">
        <Text variant="h5">How to Do an Expense</Text>
        <Text variant="body1" mt="sm">
          To submit an expense, go to the Dashboard page and click on the "Add
          Expense" button. Fill in the details of your expense, including the
          expense type, amount, and description. Then submit the expense for
          review.
        </Text>
      </Paper>
      <Divider margins="lg" />
      <Paper padding="lg" shadow="md" mt="lg">
        <Text variant="h5">Stages of an Expense</Text>
        <Text variant="body1" mt="sm">
          Once submitted, an expense goes through several stages:
        </Text>
        <List mt="sm">
          <ListItem>Submitted: Your expense has been submitted for review.</ListItem>
          <ListItem>Approved: Your expense has been approved by the finance team.</ListItem>
          <ListItem>In Progress: Your expense is currently being processed.</ListItem>
          <ListItem>Completed: Your expense has been processed and completed.</ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default ExpensingInfoPage;
