import React from "react";
import {
  Text,
  Divider,
  Paper,
  Container,
  Group,
  SimpleGrid,
} from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import Demo from "../components/Demo";
import LineChartDemo from "../components/LineChartDemo";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const statsData = [
  { title: "Total Expensed", icon: "receipt", value: "£13,456", diff: 34 },
  {
    title: "Total Expensed",
    description: "Office Items",
    icon: "coin",
    value: "£4,145",
    diff: -13,
  },
  {
    title: "Total Expensed",
    description: "Other",
    icon: "discount",
    value: "£745",
    diff: 18,
  },
  {
    title: "Budget Remaining",
    icon: "user",
    value: "£188",
    diff: -30,
  },
];

function StatsGrid() {
  const stats = statsData.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} w="100%" display="flex" style={{flexDirection: "column", justifyContent: "space-between"}}>
        <Group justify="space-between" wrap="nowrap" align="start">
          <div>
            <Text size="xs" c="dimmed" className={classes.title}>
              {stat.title}
            </Text>
            {stat.description && (
              <Text size="xs" c="dimmed">
                {stat.description}
              </Text>
            )}
          </div>
          <Icon
            className={classes.icon}
            size="1.4rem"
            stroke={1.5}
            style={{ flexShrink: 0 }}
          />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} my="sm">
        {stats}
      </SimpleGrid>
    </div>
  );
}

const AnalyticsPage = () => {
  return (
    <div>
      <Container size="sm">
        <StatsGrid />
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
