const { default: chalk } = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
		console.log(chalk.blue("\nConnection to database :", chalk.bold.green("success")));
	} catch (error) {
		console.log(chalk.red("\nCan not connect to remote database, error is =>", error));
	}
}

module.exports = connectDB