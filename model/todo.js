const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		index: true,
	},
	title: {
		type: String,
		minLength: [3, "todo title must been longer than 2 character"],
		maxLength: [50, "todo title can not be longer than 20 character"],
		trim: true,
		required: [true, "todo title is required"],
		validate: function (val) {
			console.log("La valeur est :", this);
			this.title = this.title.slice(0, 50)
		}
	},
	description: {
		type: String,
		trim: true,
	},
	active: {
		type: Boolean,
		default: true
	},
	status: {
		type: Boolean,
		default: false
	},
	public: {
		type: Boolean,
		default: false,
	},
},
	{ timestamps: true }
)
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
