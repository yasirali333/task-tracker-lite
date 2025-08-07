const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const protect = require("../middleware/auth");

router.post("/", protect, taskController.createTask);
router.get("/", protect, taskController.getAllTasks);
router.get("/:id", protect, taskController.getTaskById);
router.put("/:id", protect, taskController.updateTask);
router.delete("/:id", protect, taskController.deleteTask);

module.exports = router;
