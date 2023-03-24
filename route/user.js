const express = require("express");
const { signupUser } = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/user/signup", signupUser);

module.exports = userRoutes