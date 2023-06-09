const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authantification = async (req, res, next) => {
	try {
		const authToken = req.header("Authorization").replace("Bearer ", "");
		const decodeToken = jwt.verify(authToken, "theSecretKey");
		const user = User.findOne({ _id: decodeToken._id, "tokens.token": authToken });
		if (!user) throw new Error("error catch, user is : " + user.toString());
		req.user = user
		next();
	} catch (error) {
		console.error(error);
		return res.status(401).json({ message: "signin before update your account", error })
	}
}

module.exports = authantification;