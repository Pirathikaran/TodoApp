const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const { hashValidator } = require("../helpers/hashing");
const { tokenGenerator } = require("../helpers/token");
const authVerify = require("../helpers/authVerify");
const userController = require("../controller/authController");
const todoController = require("../controller/todoController");

authRoutes.post("/signup", async (req, res) => {
  await userController.signupUser(req, res);
});

authRoutes.post("/login", async (req, res) => {
  await userController.loginUser(req, res);
});

module.exports = authRoutes;
