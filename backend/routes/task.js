import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// Add task
router.post('/', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = new Task({
    title,
    description,
    dueDate,
    userId: req.userId
  });
  await task.save();
  res.json(task);
});

// Get user tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// Update task
router.patch('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  const { status, description } = req.body;

  if (status === 'completed' && new Date(task.dueDate) > new Date()) {
    return res.status(400).json({ message: 'Cannot complete task before due date' });
  }

  if (status) task.status = status;
  if (description) task.description = description;

  await task.save();
  res.json(task);
});

// Overdue tasks
router.get('/overdue', async (req, res) => {
  const now = new Date();
  const overdueTasks = await Task.find({
    userId: req.userId,
    dueDate: { $lt: now },
    status: { $ne: 'completed' }
  });
  res.json(overdueTasks);
});

export default router;
