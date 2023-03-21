const chalk = require("chalk");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, resp) => {
	resp.status(200).send("<h1>Home Page</h1>");
});

app.listen(PORT, () => {
	console.log(`Server starting at : ${chalk.blue.bold("localhost:" + PORT)}`);
});