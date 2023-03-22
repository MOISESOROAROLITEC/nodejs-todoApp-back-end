const { default: chalk } = require("chalk");
const express = require("express");
const { default: mongoose } = require("mongoose");
const {
	getOne, NotFoundUri,
	getUserTodos, getAll, createPublicTodo,
	getPublicTodos,
} = require("../controller/todos");

const router = express.Router();
const Todo = require("../model/todo")

router.get("/todo/all", getAll);
router.get("/todo/userTodos", getUserTodos);
router.get("/todo/publicTodos", getPublicTodos);
router.get("/todo/:id", getOne);
router.get("*", NotFoundUri);

router.post("/todo/createPublicTodo", createPublicTodo)

module.exports = router;