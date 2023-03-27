const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
		unique: true,
		lowercase: true,
		validate: {
			validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			},
			message: props => `${props.value} is not a valid email`
		}
	},
	password: {
		type: String,
		required: [true, "User name is required"],
		validate: {
			validator: function (v) {
				return v.length >= 8 && v.length < 50;
			},
			message: props => `${props.value} is not a valid password, it should be between 8 and 50 characters`
		}
	},
	image: {
		type: Buffer,
	}
},
	{ timestamps: true }
)

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
})
const User = mongoose.model("User", userSchema);

module.exports = User;