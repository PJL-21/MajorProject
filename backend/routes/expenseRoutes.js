const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/userAuth');
const Expense = require('../models/Expense');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to create a new expense
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Extract expense information from the request body
    const { title, amount, expenseType, progress, createdBy, user } = req.body;

    // Create a new expense instance and associate it with the current user
    const newExpense = new Expense({
      title,
      amount,
      expenseType,
      progress,
      user: req.user.id, // Assign the user ID to the expense
      createdBy: req.user.name, // Assign the user's name as the creator
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save the new expense to the database
    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;