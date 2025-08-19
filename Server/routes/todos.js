const router = require("express").Router();
const Todo = require("../Models/Todo");
const auth = require("../middleware/auth");

// Get all todos for authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create todo
router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      user: req.user.id,
      task: req.body.task
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update todo (mark complete/incomplete)
router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete todo
router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
