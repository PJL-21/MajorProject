const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  expenseType: { type: String, required: true },
  amount: { type: Number, required: true },
  progress: {
    type: String,
    enum: ["submitted", "approved", "in_progress", "completed"],
    default: "submitted",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the expense
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the admin assigned to this expense
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
