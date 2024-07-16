import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Text,
  Modal,
  TextInput,
  Flex,
  Button,
  Select,
  NumberInput,
  Group,
  FileInput,
} from "@mantine/core";
import { useAuth } from "../components/AuthProvider";
import ExpenseCard from "../components/ExpenseCard";
import {
  DndContext,
  DragOverlay,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import ExpenseColumn from "../components/ExpenseColumn";


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
    progress: "submitted",
    amount: "",
    createdBy: user.name,
    createdAt: "",
    updatedAt: "",
    image: null
  });
  const [activeTicket, setActiveTicket] = useState(null);

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

      /**
               /\_/\     meow.
              ( o.o )
               > ^ <
       */

      // Clear form data
      setFormData({
        title: "",
        expenseType: "",
        progress: "submitted",
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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

  const onDragStart = (event) => {
    setActiveTicket(event.active.id);
  };

  const onDragEnd = async (event) => {
    const ticketId = event.active.id;
    const newStatus = event.over.id;
    console.log(ticketId, "was dropped in", newStatus);
    setActiveTicket(null);
    setExpenses((old) =>
      old.map((ticket) => {
        if (ticket._id !== ticketId) return ticket;
        console.log("Found", ticket);
        return { ...ticket, progress: newStatus };
      })
    );

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/admin/expenses/${ticketId}/stage`,
        {
          stage: newStatus,
        },
        {
          headers: { authorization: token },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

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
              leftSection="£"
            />
            <TextInput label="Budget Code" placeholder="0000" disabled />
            <FileInput
              name="file" 
              label="Add Receipt"
              description="Add an image of your receipt"
              placeholder="Click here to upload"
              value={formData.image}
              onChange={(e) => handleChange("image", e)}
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

      <Group align="middle" justify="space-between" mb="xs">
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
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <Flex gap="sm">
          <ExpenseColumn
            title="Submitted"
            stage="submitted"
            cards={submitted}
          />
          <ExpenseColumn title="Approved" stage="approved" cards={approved} />
          <ExpenseColumn
            title="In Progress"
            stage="in_progress"
            cards={inProgress}
          />
          <ExpenseColumn
            title="Completed"
            stage="completed"
            cards={completed}
            isEnd
          />
        </Flex>
        <DragOverlay>
          <ExpenseCard
            expense={expenses.find((expense) => expense._id === activeTicket)}
          />
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default DashboardPage;
