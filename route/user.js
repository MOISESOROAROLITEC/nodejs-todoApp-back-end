const express = require("express");
const { signup, signin, update } = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/user/signup", signup);
userRoutes.post("/user/signin", signin);
userRoutes.patch("/user/update/:id", update);

module.exports = userRoutes;