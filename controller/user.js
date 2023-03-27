const User = require("../model/user");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
	try {
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		userSave = await user.save();
		return res.status(200).json({ user: userSave, message: "user creating success" });
	} catch (error) {
		const err = `${error}`;
		return res.status(500).json({ message: "Error to create user", error: err });
	}
}
const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "You should provide email and password" });
		}
		const user = await User.findOne({ email });
		if (!user || user.length == 0) {
			return res.status(400).json({ message: "Retry again, email or password are wrong" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			return res.status(200).json(user);
		}
		return res.status(400).json({ message: "Retry again, email or password are wrong" });
	} catch (error) {
		return res.status(500).json({ message: "Server Error", error: `${error}` });
	}
}

const update = async (req, res) => {
	console.log(req.params);
	try {
		const keys = Object.keys(req.body);
		const availableKeys = ["name", "email", "password", "image"];
		const propertiesAreAvailable = keys.every(key => availableKeys.includes(key));

		if (!propertiesAreAvailable) {
			return res.status(400).json({
				message: "the identifiers do not correspond with those expected",
				availableIdendifiers: { name: String, email: String, password: String, image: Buffer }
			})
		}
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
		if (user) {
			return res.status(200).json({ user, message: "user updating with success" });
		} else {
			return res.status(404).json({ message: `can not find user with id ${req.params.id}` });
		}
	} catch (error) {
		return res.status(500).json({ message: "Error to update user", error: `${error}` });
	}
}

// const

module.exports = { signup, signin, update };
