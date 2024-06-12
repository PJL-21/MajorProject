import React from "react";
import { Text, Divider, Paper, Table } from "@mantine/core";

const ExpenseItemsPage = () => {
  return (
    <div>
      <Text variant="h4" align="center" mt="lg">
        Expense Items
      </Text>
      <Paper padding="lg" shadow="md" mt="lg">
        <Text variant="h5">Office Items</Text>
        <Table mt="sm">
          <thead>
            <tr>
              <th>Item</th>
              <th>Approximate Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Desk</td>
              <td>$200</td>
            </tr>
            <tr>
              <td>Chair</td>
              <td>$100</td>
            </tr>
            {/* Add more items as needed */}
          </tbody>
        </Table>
      </Paper>
      <Divider margins="lg" />
      <Paper padding="lg" shadow="md" mt="lg">
        <Text variant="h5">Other Expenses</Text>
        <Table mt="sm">
          <thead>
            <tr>
              <th>Expense</th>
              <th>Approximate Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lunch</td>
              <td>$20</td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>$30</td>
            </tr>
            {/* Add more expenses as needed */}
          </tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default ExpenseItemsPage;
