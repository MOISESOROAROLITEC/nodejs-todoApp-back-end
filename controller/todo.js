const { default: chalk } = require("chalk");
const { default: mongoose } = require("mongoose");
const Todo = require("../model/todo");

const getAll = async (req, res) => {
	try {
		const todos = await Todo.find({});
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "You have not a todo" });
		}
		return res.status(200).send({ todos, length: todos.length });
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Error to get all todos" })
	}
}
const getUserTodos = async (req, res) => {
	try {
		let todos = await Todo.find({});
		if (todos)
			todos = todos.filter(el => el.public == false);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "You have not a todo" })
		}
		return res.status(200).json(todos);
	} catch (err) {
		console.log(chalk.red(err));
		res.status(500).send()
	}
}
const getPublicTodos = async (req, res) => {
	try {
		let todos = await Todo.find({});
		if (todos)
			todos = todos.filter(el => el.public == true);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "Public todos list is empty" })
		}
		return res.status(200).json(todos);
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "server error" })
	}
}
const getOne = async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return res.status(404).json({ message: "Todo id format is not correct" })
		const todos = await Todo.findById(req.params.id);
		if (!todos) {
			return res.status(404).send({ message: req.params.id + "can not find" })
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		res.status(500).send()
	}
}
const getAllTodosActif = async (req, res) => {
	try {
		let todos = await Todo.find({}).or([{ active: true }]);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "database have not actif todos" });
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Error to get all actif todos" })
	}
}
const getAllTodosInactif = async (req, res) => {
	try {
		let todos = await Todo.find({}).or([{ active: false }]);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "database have not inactif todos" });
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Error to get all actif todos" })
	}
}
const getUserTodosActif = async (req, res) => {
	try {
		let todos = await Todo.find().and([{ active: true }, { public: false }]);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "You have not actif todos" });
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Error to get all user actif todos" })
	}
}
const getUserTodosInactif = async (req, res) => {
	try {
		let todos = await Todo.find().and([{ active: false }, { public: false }]);
		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "You have not inactif todos" });
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Error to get all user actif todos" })
	}
}
const createTodo = async (req, res) => {
	try {
		const { title, description, public, active, status } = req.body
		const todo = new Todo({ title: title, description: description, public: public, active: active, status: status });
		const todoSave = await todo.save();
		return res.status(200).json({ todo: todoSave, message: "saving succesfull" })
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Tis todo can not been registering" })
	}
}
const deleteOneTodo = async (req, res) => {
	try {
		const todo = await Todo.findByIdAndDelete(req.params.id);
		if (!todo)
			return res.status(404).json({ massage: `The todo with id = ${req.params.id} was not found` });
		return res.json({ todo, message: "The task was successfully deleted" })
	} catch (error) {
		return res.status(500).json({ message: "server was crashed" })
	}
}
const deleteAllTodoOfUser = async (req, res) => {
	try {
		const todo = await Todo.deleteMany({ public: "false" });
		if (!todo || todo.length == 0)
			return res.status(404).json({ massage: `You have not ` });
		return res.json({ todo, message: "The task was successfully deleted" })
	} catch (error) {
		return res.status(500).json({ message: "server was crashed" })
	}
}
const NotFoundUri = (req, res) => {
	res.status(404).send(
		{ message: "The url : " + req.rawHeaders[7] + req.url + " is not found", code: 404 }
	);
}

module.exports = {
	getOne,
	getUserTodos,
	getAll,
	createTodo,
	getPublicTodos,
	getAllTodosActif,
	getAllTodosInactif,
	getUserTodosActif,
	getUserTodosInactif,
	deleteOneTodo,
	deleteAllTodoOfUser,
	NotFoundUri,
}