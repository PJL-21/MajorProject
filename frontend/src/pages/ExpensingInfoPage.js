import React from "react";
import { Text } from "@mantine/core";

const ExpensingInfoPage = () => {
  return (
    <div>
      <Text variant="h4">Expensing Information</Text>
      <Text variant="body1">
        Here are some details about different expenses you can claim:
      </Text>
      <ul>
        <li>
          <Text
            primary="Lunch"
            secondary="Expense lunch costs incurred during work hours."
          />
        </li>
        <li>
          <Text
            primary="Office chair"
            secondary="Claim the cost of purchasing a new office chair."
          />
        </li>
        {/* Add more expense details as needed */}
      </ul>
    </div>
  );
};

export default ExpensingInfoPage;
