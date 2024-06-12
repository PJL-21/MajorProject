import React from "react";
import { Text, Divider, Paper, Container } from "@mantine/core";
import Demo from "../components/Demo";
import LineChartDemo from "../components/LineChartDemo";

const AnalyticsPage = () => {
  return (
    <div>
      <Container size="sm">
        <Text variant="h1" align="center" mt="lg">
          My Expenses
        </Text>
        <Text variant="h5">Expenses per month</Text>
        <Demo />
        <Divider margins="lg" />
        <Text variant="h5">Additional Analytics</Text>
        <Text variant="h5">Annual Overview</Text>
        <LineChartDemo />
        {/* Add more charts or analytics components as needed */}
      </Container>
    </div>
  );
};

export default AnalyticsPage;
