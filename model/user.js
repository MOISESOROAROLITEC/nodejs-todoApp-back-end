const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

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
		required: [true, "User name is required"]
	},
	image: {
		type: Buffer,
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
},
	{ timestamps: true }
)

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, "theSecretKey");

	if (!this.tokens || this.tokens.length == 0) {
		this.tokens.push({ token });
	}
	await this.save();
	return token;
}

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
})
const User = mongoose.model("User", userSchema);

module.exports = User;