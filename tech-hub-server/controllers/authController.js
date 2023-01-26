const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      picture: req.body.picture,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      error: {
        err,
      },
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    // Check if the user is exist and password matches
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // Everything is ok, let the user login
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      error: {
        err,
      },
    });
  }
};
