// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/adminAuth');
const Expense = require('../models/Expense');
const User = require('../models/User');

// View all expenses (admin only)
router.get('/expenses', isAdmin, async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign admin to expense
router.put('/expenses/:id/assign', isAdmin, async (req, res) => {
  try {
    const expenseId = req.params.id;
    const adminId = req.user._id;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.assignedTo = adminId;
    await expense.save();

    res.json({ message: 'Admin assigned to expense successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update expense stage
router.put('/expenses/:id/stage', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { stage } = req.body;

    const validStages = ['submitted', 'approved', 'in_progress', 'completed'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: 'Invalid stage' });
    }

    const expense = await Expense.findByIdAndUpdate(id, { stage }, { new: true });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View expenses by stage
router.get('/expenses/:stage', isAdmin, async (req, res) => {
  try {
    const { stage } = req.params;
    const validStages = ['submitted', 'approved', 'in_progress', 'completed'];
    if (!validStages.includes(stage)) {
      return res.status(400).json({ message: 'Invalid stage' });
    }

    const expenses = await Expense.find({ stage });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete expense
router.put('/expenses/:id/complete', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndUpdate(id, { stage: 'completed' }, { new: true });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense completed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Other admin routes can go here...

module.exports = router;