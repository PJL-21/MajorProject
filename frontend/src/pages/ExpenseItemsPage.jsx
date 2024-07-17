import React from "react";
import {
  Text,
  Stack,
  Paper,
  Table,
  Select,
  TextInput,
  Group,
} from "@mantine/core";
import styles from "./table.module.css";

const tables = [
  {
    title: "Office Items",
    entries: [
      {
        name: "Desk",
        value: "£200",
      },
      {
        name: "Chair",
        value: "£100",
      },
      {
        name: "Footrest",
        value: "£50",
      },
      {
        name: "Mouse",
        value: "£50",
      },
      {
        name: "Keyboard",
        value: "£100",
      },
      {
        name: "Monitor",
        value: "£250",
      },
      {
        name: "Laptop Riser",
        value: "£20",
      },
      {
        name: "Webcam",
        value: "£70",
      },
      {
        name: "Headphones",
        value: "£50",
      },
      {
        name: "Speakers",
        value: "£30",
      },
    ],
  },
  {
    title: "Travel Expenses",
    entries: [
      {
        name: "Fuel Cost",
        value: "45p per mile",
      },
      {
        name: "Train",
        value: "Standard Class - £300 max",
      },
      {
        name: "Bus/Coach",
        value: "£100 max",
      },
      {
        name: "Other",
        value: "Contact Finance Team",
      },
    ],
  },
  {
    title: "Other Expenses",
    entries: [
      {
        name: "Breakfast",
        value: "£20",
      },
      {
        name: "Lunch",
        value: "£20",
      },
      {
        name: "Dinner",
        value: "£30",
      },
    ],
  },
];

const sortEntry = (item1, item2) => {
  if (item1.name.toLowerCase() < item2.name.toLowerCase()) {
    return -1;
  }
  if (item2.name.toLowerCase() > item1.name.toLowerCase()) {
    return 1;
  }
  return 0;
};

const ExpenseItemsPage = () => {
  const [sort, setSort] = React.useState("asc");
  const [filter, setFilter] = React.useState("");

  const newData = structuredClone(tables);

  for (const table of newData) {
    table.entries.sort(sortEntry);
  }

  if (sort === "desc") {
    for (const table of newData) {
      table.entries.reverse();
    }
  }

  return (
    <Stack>
      <Text size="lg" mb="sm" fw={600} align="center">
        Expense Items
      </Text>
      <Group justify="end" wrap="nowrap">
        <Select
          label="Sort"
          placeholder="Sort"
          value={sort}
          onChange={setSort}
          data={[
            { label: "Alphabetical (A-Z)", value: "asc" },
            { label: "Alphabetical (Z-A)", value: "desc" },
          ]}
        />
        <TextInput
          label="Search"
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.currentTarget.value)}
        />
      </Group>
      {newData.map((table, index) => (
        <Paper padding="lg" withBorder key={index}>
          <Text variant="h5" p="sm">
            {table.title}
          </Text>
          <Table withColumnBorders className={styles["table"]}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Item</Table.Th>
                <Table.Th>Budget Allowance</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {table.entries.map(
                (entry, index) =>
                  ((filter.length > 0 &&
                    entry.name.toLowerCase().includes(filter.toLowerCase())) ||
                    filter.length === 0) && (
                    <Table.Tr key={index}>
                      <Table.Td>{entry.name}</Table.Td>
                      <Table.Td>{entry.value}</Table.Td>
                    </Table.Tr>
                  )
              )}
            </Table.Tbody>
          </Table>
        </Paper>
      ))}
    </Stack>
  );
};

export default ExpenseItemsPage;
