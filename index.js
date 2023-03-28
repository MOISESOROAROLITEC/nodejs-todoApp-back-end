const chalk = require("chalk");
const express = require("express");
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const todoRoutes = require("./route/todo");
const connectDB = require('./database/connection');
const userRoutes = require("./route/user");


const PORT = process.env.PORT;
const app = express();

connectDB();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/", (req, res) => { res.status(200).send("<h1>Home Page</h1>") });
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.get("*", (req, res) => { res.status(404).send({ message: "The url : " + `localhost:${PORT}` + req.url + " is not found", code: 404 }) })

console.log(app.route)

app.listen(PORT, () => {
	console.log(`Server starting at : ${chalk.blue.bold("localhost:" + PORT)}`);

	console.log(chalk.blue.bold.underline('\nThe app routes are'));
	console.log(chalk.bold.blue("\nTodo Routes :"));
	todoRoutes.stack.forEach(layer => {
		const methode = Object.keys(layer.route.methods).toString().toUpperCase()
		const route = layer.route.path
		console.log(chalk.blue(`${chalk.bold(methode)} : localhost:${PORT}${route}`));
	});

	console.log(chalk.blue.bold('\nUser Routes :'));
	userRoutes.stack.forEach(layer => {
		const methode = Object.keys(layer.route.methods).toString().toUpperCase()
		const route = layer.route.path
		console.log(chalk.blue(`${chalk.bold(methode)} : localhost:${PORT}${route}`));
	})
});
