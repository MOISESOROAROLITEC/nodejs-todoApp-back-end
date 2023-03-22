const chalk = require("chalk");
const express = require("express");
require("dotenv").config();
const todoRoutes = require("./route/todo");
const connect = require('./database/connection')
const bodyParser = require('body-parser')


const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", todoRoutes);

connect();

app.get("/", (req, resp) => {
	resp.status(200).send("<h1>Home Page</h1>");
});
app.listen(PORT, () => {

	console.log(`Server starting at : ${chalk.blue.bold("localhost:" + PORT)}`);
});
