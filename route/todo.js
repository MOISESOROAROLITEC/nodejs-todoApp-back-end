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
todosRoutes.get("/get-all", authantification, getAll);
todosRoutes.get("/userTodos", authantification, getUserTodos);
todosRoutes.get("/publicTodos", getPublicTodos);
todosRoutes.get("/getAllTodosActif", authantification, getAllTodosActif);
todosRoutes.get("/getAllTodosInactif", authantification, getAllTodosInactif);
todosRoutes.get("/getUserTodosActif", authantification, getUserTodosActif);
todosRoutes.get("/getUserTodosInactif", authantification, getUserTodosInactif);
todosRoutes.get("/getOne/:id", authantification, getOne);
todosRoutes.delete("/deleteOneTodo/:id", authantification, deleteOneTodo);
todosRoutes.delete("/deleteAllTodoOfUser", authantification, deleteAllTodoOfUser);
todosRoutes.post("/createTodo", authantification, createTodo)

module.exports = todosRoutes;