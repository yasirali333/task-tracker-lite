const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
  try {
    let body = { ...req.body };
    console.log('Incoming createTask body:', body);
    if (body.completed !== undefined) {
      body.completed = body.completed === true || body.completed === "true";
      console.log('Parsed completed value:', body.completed);
      if (body.completed && body.dueDate && new Date(body.dueDate) > new Date()) {
        return res.status(400).json({ message: "Task cannot be marked as completed before its due date." });
      }
    }
    const newTask = await Task.create(body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    let body = { ...req.body };
    console.log('Incoming updateTask body:', body);
    if (body.completed !== undefined) {
      body.completed = body.completed === true || body.completed === "true";
      console.log('Parsed completed value:', body.completed);
      if (body.completed && body.dueDate && new Date(body.dueDate) > new Date()) {
        return res.status(400).json({ message: "Task cannot be marked as completed before its due date." });
      }
    }
    const task = await Task.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
