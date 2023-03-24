const { default: chalk } = require("chalk");
const express = require("express");
const { default: mongoose } = require("mongoose");
const {
	getOne, NotFoundUri, getUserTodos,
	getAll, createPublicTodo, getPublicTodos,
	getAllTodosActif, getUserTodosActif,
	getAllTodosInactif, getUserTodosInactif,
} = require("../controller/todos");

const router = express.Router();
const Todo = require("../model/todo")

router.get("/todo/all", getAll);
router.get("/todo/userTodos", getUserTodos);
router.get("/todo/publicTodos", getPublicTodos);
router.get("/todo/getAllTodosActif", getAllTodosActif);
router.get("/todo/getAllTodosInactif", getAllTodosInactif);
router.get("/todo/getUserTodosActif", getUserTodosActif);
router.get("/todo/getUserTodosInactif", getUserTodosInactif);

router.get("/todo/:id", getOne);

router.post("/todo/createPublicTodo", createPublicTodo)
router.get("*", NotFoundUri);

module.exports = router;