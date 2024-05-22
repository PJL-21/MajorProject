import React from 'react';
import { Text, Divider, Paper } from '@mantine/core';
import Demo from '../components/Demo';

const AnalyticsPage = () => {
  return (
    <div>
      <Text variant="h1" align="center" mt="lg">
        My Expenses
      </Text>
        <Text variant="h5">Expenses per month</Text>
        <Demo />
      <Divider margins="lg" />
        <Text variant="h5">Additional Analytics</Text>
        {/* Add more charts or analytics components as needed */}
    </div>
  );
};

export default AnalyticsPage;
