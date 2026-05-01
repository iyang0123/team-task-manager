const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const newTask = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;