const express = require("express");
const {
	getOne, NotFoundUri, getUserTodos,
	getAll, createTodo, getPublicTodos,
	getAllTodosActif, getUserTodosActif,
	getAllTodosInactif, getUserTodosInactif,
	deleteOneTodo, deleteAllTodoOfUser,
} = require("../controller/todo");

const todosRoutes = express.Router();
todosRoutes.get("/todo/get-all", getAll);
todosRoutes.get("/todo/userTodos", getUserTodos);
todosRoutes.get("/todo/publicTodos", getPublicTodos);
todosRoutes.get("/todo/getAllTodosActif", getAllTodosActif);
todosRoutes.get("/todo/getAllTodosInactif", getAllTodosInactif);
todosRoutes.get("/todo/getUserTodosActif", getUserTodosActif);
todosRoutes.get("/todo/getUserTodosInactif", getUserTodosInactif);
todosRoutes.get("/todo/getOne/:id", getOne);
todosRoutes.delete("/todo/deleteOneTodo/:id", deleteOneTodo);
todosRoutes.delete("/todo/deleteAllTodoOfUser", deleteAllTodoOfUser);


todosRoutes.post("/todo/createTodo", createTodo)
// todosRoutes.get("*", NotFoundUri);

module.exports = todosRoutes;