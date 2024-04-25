/*
// backend/routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

// Create a new expense
router.post('/expenses', auth, async (req, res) => {
  try {
    const { title, amount } = req.body;

    // Create a new expense
    const newExpense = new Expense({ title, amount, user: req.user._id });
    await newExpense.save();

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all expenses for the logged-in user
router.get('/expenses', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single expense by ID
router.get('/expenses/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an expense
router.put('/expenses/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(id, { title, amount }, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an expense
router.delete('/expenses/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

*/

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/adminAuth');
const Expense = require('../models/Expense');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
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

