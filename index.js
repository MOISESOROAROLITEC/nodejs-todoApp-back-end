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

app.use("/", todoRoutes);

app.listen(PORT, () => {
	console.log(`Server starting at : ${chalk.blue.bold("localhost:" + PORT)}`);
});
