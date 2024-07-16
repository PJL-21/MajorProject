import React from 'react';
import { LineChart } from '@mantine/charts';
import { data } from '../data';

function LineChartDemo() {
  return (
    <LineChart
      h={400}
      data={data}
      dataKey="category"
      series={[
        { name: 'DailyTravel', label: 'Daily Travel', color: 'blue.6' },
        { name: 'OfficeItems', label: 'Office Items', color: 'blue.4' },
        { name: 'WorkTrip', label: 'Work Trip', color: 'blue.2' },
      ]}
      curveType="linear"
    />
  );
}

export default LineChartDemo;
