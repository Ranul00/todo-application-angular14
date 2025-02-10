const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { status: false },
      order: [["createdAt", "DESC"]],
      limit: 5,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving tasks",
      error: error.message,
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({ title, description });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error creating task",
      error: error.message,
    });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const [affectedRows] = await Task.update(
      { status: true },
      { where: { id: req.params.id } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task marked as completed" });
  } catch (error) {
    res.status(500).json({
      message: "Error updating task",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const deleted = await Task.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error.message,
    });
  }
};
