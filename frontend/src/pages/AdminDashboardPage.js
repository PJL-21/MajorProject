import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboardPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("/api/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <Text variant="h4">Admin Dashboard</Text>
      <Text variant="h5">Expenses</Text>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {/* TODO */}
            <Text
              primary={expense.title}
              secondary={`Amount: $${expense.amount}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboardPage;
