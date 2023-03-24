const User = require("../model/user")

const signupUser = async (req, rep) => {
	console.log(req.body);
	try {
		let user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		userSave = await user.save();
		return rep.status(200).json({ user: userSave, message: "user creating success" })
	} catch (error) {
		return rep.status(500).json({ message: "Error to create user", error: error })
	}
}
module.exports = { signupUser }