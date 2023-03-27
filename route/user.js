const express = require("express");
const { signup, signin, update, get } = require("../controller/user");

const userRoutes = express.Router();

userRoutes.post("/user/signup", signup);
userRoutes.post("/user/signin", signin);
userRoutes.get("/user/get/:id", get);
userRoutes.patch("/user/update/:id", update);

module.exports = userRoutes;
