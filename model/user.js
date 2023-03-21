const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: {
		type: Number,
		unique: true,
		index: true,
	},
	name: {
		type: [String, "You must put string"],
		minLength: [3, "User name must been longer than 2 character"],
		maxLength: [20, "User name can not be longer than 20 character"],
		trim: true,
		required: [true, "User name is required"]
	},
	email: {
		type: [String, "You must put string"],
		trim: true,
		required: [true, "User name is required"],
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: props => `${props.value} is not a valid email`
		}
	},
	passeword: {
		type: String,
		minLength: [8, "User name must been longer than  character"],
		maxLength: [20, "User name can not be longer than 20 character"],
		required: [true, "User name is required"]
	},
	image: {
		type: Buffer,
	}
})

const User = mongoose.model("User", userSchema);

module.exports = User;