const User = require("../model/user")

const signupUser = async (req, rep) => {
	try {
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		userSave = await user.save();
		return rep.status(200).json({ user: userSave, message: "user creating success" });
	} catch (error) {
		const err = `${error}`;
		return rep.status(500).json({ message: "Error to create user", error: err });
	}
}
const signinUser = async (req, rep) => {
	const keys = Object.keys(req.body);
	const availableKeys = ["name", "email", "password", "image"];
	const propertiesAreAvailable = keys.every(key => availableKeys.includes(key));

	if (!propertiesAreAvailable) {
		return res.status(400).json({ message: "the identifiers do not correspond with those expected" })
	}
	try {
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		userSave = await user.save();
		return rep.status(200).json({ user: userSave, message: "user creating success" });
	} catch (error) {
		const err = `${error}`;
		return rep.status(500).json({ message: "Error to create user", error: err });
	}
}

module.exports = { signupUser }