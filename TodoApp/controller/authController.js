const User = require("../models/User");
const { hashGenerate } = require("../helpers/hashing");
const { hashValidator } = require("../helpers/hashing");
const { tokenGenerator } = require("../helpers/token");

async function signupUser(req, res) {
  try {
    const hashPassword = await hashGenerate(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

async function loginUser(req, res) {
  try {
    const existedUser = await User.findOne({ email: req.body.email });
    if (!existedUser) {
      res.status(400).json({ error: { message: "email is invalid" } });
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existedUser.password
      );
      if (!checkUser) {
        res.status(400).json({ error: { message: "password is invalid" } });
        return;
      } else {
        const token = await tokenGenerator(existedUser.email, existedUser._id);
        res.status(201).json({ token });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: {
        message: "bad parameters",
      },
    });
  }
}

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
