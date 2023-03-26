const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		minLength: [3, "todo title must been longer than 2 character"],
		maxLength: [50, "todo title can not be longer than 20 character"],
		trim: true,
		required: [true, "todo title is required"],
		validate: function (val) {
			this.title = this.title.slice(0, 50)
		}
	},
	description: {
		type: String,
		trim: true,
	},
	deleted: {
		type: Boolean,
		default: true
	},
	done: {
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

