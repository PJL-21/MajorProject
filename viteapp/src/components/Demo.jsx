import React from 'react';
import { BarChart } from '@mantine/charts';
import { data } from '../data';

function Demo() {
  return (
    <BarChart
      h={400}
      data={data}
      dataKey="month"
      type="stacked"
      withLegend
      legendProps={{ verticalAlign: 'bottom' }}
      series={[
        { name: 'DailyTravel', label: 'Daily Travel', color: 'orange.6' },
        { name: 'OfficeItems', label: 'Office Items', color: 'orange.4' },
        { name: 'WorkTrip', label: 'Work Trip', color: 'orange.2' },
      ]}
    />
  );
}

export default Demo;