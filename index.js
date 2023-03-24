const chalk = require("chalk");
const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt")
require("dotenv").config();
const todoRoutes = require("./route/todo");
const connectDB = require('./database/connection')


const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, resp) => {
	resp.status(200).send("<h1>Home Page</h1>");
});
console.log(todoRoutes.stack[8].route.methods);
app.use("/", todoRoutes);

app.listen(PORT, () => {
	console.log(`Server starting at : ${chalk.blue.bold("localhost:" + PORT)}`);
	console.log(chalk.blue.bold.underline('\nThe app routes are :'));

	todoRoutes.stack.forEach(layer => {
		const methode = Object.keys(layer.route.methods).toString().toUpperCase()
		const route = layer.route.path
		console.log(chalk.blue(`${chalk.bold(methode)} : localhost:${PORT}${route}`));
	})
});
