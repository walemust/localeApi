const express = require("express");
const authRouter = express.Router();
const { registerUser, login } = require("../controllers/auth.controller")

authRouter.post("/register", registerUser);
authRouter.post("/login", login);

module.exports = authRouter;