import { Paper, Text, Flex, Divider } from "@mantine/core";
import ExpenseCard from "./ExpenseCard";
import { useDroppable } from "@dnd-kit/core";

const ExpenseColumn = ({ cards, title, stage }) => {
  const { setNodeRef } = useDroppable({ id: stage });

  return (
    <Paper
      style={{
        flexBasis: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={setNodeRef}
      withBorder
    >
      <Text component="h4" align="center" py="xs" fw={600}>
        {title}
      </Text>
      <Divider />
      <Flex direction="column" gap="xs" style={{ flexGrow: "1" }} p="xs" bg="gray.1">
        {cards.map((expense) => (
          <ExpenseCard expense={expense} key={expense._id} />
        ))}
      </Flex>
    </Paper>
  );
};

export default ExpenseColumn;
