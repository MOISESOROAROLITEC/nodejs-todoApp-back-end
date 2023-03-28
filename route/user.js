const express = require("express");
const { signup, signin, update, get } = require("../controller/user");
const authantification = require("../minddlewares/user");

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/signin", signin);
userRoutes.get("/get/:id", authantification, get);
userRoutes.patch("/update/:id", authantification, update);

module.exports = userRoutes;