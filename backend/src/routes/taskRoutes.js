const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  markComplete,
} = require("../controllers/taskController");

router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.delete("/tasks/:id", markComplete);
router.put("/tasks/:id/done", markComplete);

module.exports = router;
