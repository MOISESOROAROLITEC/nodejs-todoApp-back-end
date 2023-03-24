const express = require("express");
const {
	getOne, NotFoundUri, getUserTodos,
	getAll, createTodo, getPublicTodos,
	getAllTodosActif, getUserTodosActif,
	getAllTodosInactif, getUserTodosInactif,
	deleteOneTodo, deleteAllTodoOfUser,
} = require("../controller/todo");

const router = express.Router();
router.get("/todo/getAll", getAll);
router.get("/todo/userTodos", getUserTodos);
router.get("/todo/publicTodos", getPublicTodos);
router.get("/todo/getAllTodosActif", getAllTodosActif);
router.get("/todo/getAllTodosInactif", getAllTodosInactif);
router.get("/todo/getUserTodosActif", getUserTodosActif);
router.get("/todo/getUserTodosInactif", getUserTodosInactif);
router.get("/todo/getOne/:id", getOne);
router.delete("/todo/deleteOneTodo/:id", deleteOneTodo);
router.delete("/todo/deleteAllTodoOfUser", deleteAllTodoOfUser);


router.post("/todo/createTodo", createTodo)
router.get("*", NotFoundUri);

module.exports = router;