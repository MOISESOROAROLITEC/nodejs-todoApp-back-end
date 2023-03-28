const express = require("express");
const {
	getOne, NotFoundUri, getUserTodos,
	getAll, createTodo, getPublicTodos,
	getAllTodosActif, getUserTodosActif,
	getAllTodosInactif, getUserTodosInactif,
	deleteOneTodo, deleteAllTodoOfUser,
} = require("../controller/todo");
const authantification = require("../minddlewares/user");

const todosRoutes = express.Router();
todosRoutes.get("/todo/get-all", authantification, getAll);
todosRoutes.get("/todo/userTodos", authantification, getUserTodos);
todosRoutes.get("/todo/publicTodos", getPublicTodos);
todosRoutes.get("/todo/getAllTodosActif", authantification, getAllTodosActif);
todosRoutes.get("/todo/getAllTodosInactif", authantification, getAllTodosInactif);
todosRoutes.get("/todo/getUserTodosActif", authantification, getUserTodosActif);
todosRoutes.get("/todo/getUserTodosInactif", authantification, getUserTodosInactif);
todosRoutes.get("/todo/getOne/:id", authantification, getOne);
todosRoutes.delete("/todo/deleteOneTodo/:id", authantification, deleteOneTodo);
todosRoutes.delete("/todo/deleteAllTodoOfUser", authantification, deleteAllTodoOfUser);
todosRoutes.post("/todo/createTodo", authantification, createTodo)

module.exports = todosRoutes;