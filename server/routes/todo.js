const express = require('express');
const router = express.Router();

const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const { createTodo, getTodoById, getTodo, getTodoByUser, updateTodo, deleteTodo, getTodoByUserArchive, getTodoByUserNotArchive } = require('../controllers/todo');

router.param("userId", auth);
router.param("todoId", getTodoById);

router.post("/create/:userId", auth, createTodo);
router.get("/:todoId", auth, getTodoById, getTodo);
router.get("/list/:userId", auth, getTodoByUser);
router.get("/list/archive/:userId", auth, getTodoByUserArchive);
router.get("/list/notarchive/:userId", auth, getTodoByUserNotArchive);

router.put("/update/:todoId", getTodoById, updateTodo);

router.delete("/delete/:todoId", getTodoById, deleteTodo);




module.exports = router;