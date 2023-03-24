const { default: chalk } = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URI)
		console.log(chalk.blue("connection to database :", chalk.bold.blue("succes")));
	} catch (error) {
		console.log(chalk.red("Can not connect to remote database, error is =>", error));
	}
}

module.exports = connectDB