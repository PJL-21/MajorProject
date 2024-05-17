import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  Modal,
  Paper,
  TextInput,
  Flex,
  Button,
  Select,
  Box,
  NumberInput,
  Group,
} from "@mantine/core";
import { useAuth } from "../components/AuthProvider";
import ExpenseCard from "../components/ExpenseCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const testExpense = {
  _id: 5,
  expenseType: "idk",
  amount: 5,
  title: "cool title",
  createBy: "goat",
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    expenseType: "",
    progress: "in_progress",
    amount: "",
    createdBy: user.name,
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (key, value) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value,
    }));
  };

  const refreshExpenses = () => {
    console.log("Refreshing");
    const token = localStorage.getItem("token");

    // Fetch updated expenses
    axios
      .get("http://localhost:5001/api/expenses", {
        headers: { authorization: token },
      })
      .then((response) => {
        // Filter expenses based on progress

        // Update state with updated expenses
        console.log(response);
        setExpenses(response.data);
      });
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include user information in the expense data
      const expenseData = {
        ...formData,
        createdBy: user.name, // Include the user's name
        user: user._id, // Include the user's ID
      };

      // Submit expense ticket to backend with user information
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/expenses", expenseData, {
        headers: { authorization: token },
      });

      refreshExpenses();

      // Clear form data
      setFormData({
        title: "",
        expenseType: "",
        progress: "in_progress",
        amount: "",
      });

      // Hide the expense form
      setShowExpenseForm(false);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const submitted = expenses.filter(
    (expense) => expense.progress === "submitted"
  );
  const approved = expenses.filter(
    (expense) => expense.progress === "approved"
  );
  const inProgress = expenses.filter(
    (expense) => expense.progress === "in_progress"
  );
  const completed = expenses.filter(
    (expense) => expense.progress === "completed"
  );

  return (
    <>
      <Modal
        opened={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        centered
        size="md"
        title="Add Expense Ticket"
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="xs">
            <TextInput
              name="title"
              label="Expense Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.currentTarget.value)}
              required
              placeholder="Title"
            />
            <Select
              name="expenseType"
              label="Expense Type"
              value={formData.expenseType}
              onChange={(value) => handleChange("expenseType", value)}
              required
              data={["Type 1", "Type 2", "Type 3"]}
              placeholder="Type"
            />
            <NumberInput
              name="amount"
              label="Expense Amount"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e)}
              required
              placeholder="0.00"
              min={0}
              decimalScale={2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Add Ticket
            </Button>
          </Flex>
        </form>
      </Modal>

      <Group align="middle" justify="space-between">
        <Text size="lg" mb="sm" fw={600}>
          Dashboard
        </Text>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowExpenseForm(true)}
        >
          Add Expense
        </Button>
      </Group>
      <Paper withBorder>
        <Flex px="xs">
          <Box
            style={{ borderRight: "1px solid #DDD", flexBasis: "100%" }}
            px="xs"
          >
            <Text component="h4" align="center" py="xs">
              Submitted
            </Text>
            <Flex direction="column" gap="xs">
              {submitted.map((expense) => (
                <ExpenseCard expense={expense} key={expense._id} />
              ))}
            </Flex>
          </Box>
          <Box
            style={{ borderRight: "1px solid #DDD", flexBasis: "100%" }}
            px="xs"
          >
            <Text component="h4" align="center" py="xs">
              Approved
            </Text>
            <Flex direction="column" gap="xs">
              {approved.map((expense) => (
                <ExpenseCard expense={expense} key={expense._id} />
              ))}
            </Flex>
          </Box>
          <Box
            style={{ borderRight: "1px solid #DDD", flexBasis: "100%" }}
            px="xs"
          >
            <Text component="h4" align="center" py="xs">
              In Progress
            </Text>
            <Flex direction="column" gap="xs">
              {inProgress.map((expense) => (
                <ExpenseCard expense={expense} key={expense._id} />
              ))}
            </Flex>
          </Box>
          <Box style={{ flexBasis: "100%" }} px="xs">
            <Text component="h4" align="center" py="xs">
              Completed
            </Text>
            <Flex direction="column" gap="xs">
              {completed.map((expense) => (
                <ExpenseCard expense={expense} key={expense._id} />
              ))}
            </Flex>
          </Box>
        </Flex>
      </Paper>
      {/* Add Expense Form Button */}
    </>
  );
};

export default DashboardPage;
