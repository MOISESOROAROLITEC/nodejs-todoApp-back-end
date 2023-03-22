const { default: chalk } = require("chalk");
const Todo = require("../model/todo");

const getAll = async (req, res) => {
	try {
		const todos = await Todo.find({});

		if (!todos || todos.length == 0) {
			return res.status(404).json({ message: "You have not a todo" });
		}
		res.status(200).send(todos);
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
		const todos = await Todo.findById(req.params.id);
		if (!todos) {
			res.status(404).send({ message: req.params.id + "can not find" })
			return
		}
		res.status(200).send(todos);
	} catch (err) {
		console.log(chalk.red(err));
		res.status(500).send()
	}
}

const createPublicTodo = async (req, res) => {
	try {
		const { title, description, public, active, status } = req.body
		const todo = new Todo({ title: title, description: description, public: public, active: active, status: status });
		await todo.save().then(val => {
		}).catch(err => {
			return res.status(500).json({ message: "Tis todo can not been registering" })
		});

		return res.status(200).json({ message: "saving succesfull" })
	} catch (err) {
		console.log(chalk.red(err));
		return res.status(500).json({ message: "Tis todo can not been registering" })
	}
}
const NotFoundUri = (req, res) => {
	res.status(404).send({
		message: "The url : " + req.rawHeaders[7] + req.url + " is not found",
		code: 404
	})
}

module.exports = {
	getOne,
	NotFoundUri,
	getUserTodos,
	getAll,
	createPublicTodo,
	getPublicTodos,
}
