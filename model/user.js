const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [2, "User name must been longer than 1 character"],
		maxLength: [50, "User name can not be longer than 20 character"],
		trim: true,
		required: [true, "User name is required"]
	},
	email: {
		type: String,
		trim: true,
		required: [true, "User name is required"],
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: props => `${props.value} is not a valid email`
		}
	},
	password: {
		type: String,
		minLength: [8, "password must been longer than 7 character"],
		maxLength: [50, "User name can not be longer than 50 character"],
		required: [true, "User name is required"]
	},
	image: {
		type: Buffer,
	}
},
	{ timestamps: true }
)

const User = mongoose.model("User", userSchema);

module.exports = User;