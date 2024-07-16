import React from "react";
import { Text, Paper, List, ListItem, Stepper } from "@mantine/core";

const ExpensingInfoPage = () => {
  return (
    <div>
      <Text size="lg" mb="sm" fw={600} align="center">
        Expensing Information
      </Text>
      <Paper padding="lg" mt="lg" p="sm">
        <Text variant="h5">How to file an Expense</Text>
        <Text variant="body1" mt="sm">
          To submit an expense, go to the Dashboard page and click on the "Add
          Expense" button. Fill in the details of your expense, including the
          expense type, amount, and description. Then submit the expense for
          review.
        </Text>
      </Paper>
      <Stepper active={0} my="lg" mx="sm">
        <Stepper.Step label="First step" description="Click Add Expense" />
        <Stepper.Step label="Second step" description="Fill In Details" />
        <Stepper.Step label="Final step" description="Submit For Review" />
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
      <Paper padding="lg" p="sm">
        <Text variant="h5">Stages of an Expense</Text>
        <Text variant="body1" mt="sm">
          Once submitted, an expense goes through several stages:
        </Text>
        <List mt="sm">
          <ListItem>
            Submitted: Your expense has been submitted for review.
          </ListItem>
          <ListItem>
            Approved: Your expense has been approved by the finance team.
          </ListItem>
          <ListItem>
            In Progress: Your expense is currently being processed.
          </ListItem>
          <ListItem>
            Completed: Your expense has been processed and completed.
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default ExpensingInfoPage;
