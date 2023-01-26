const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

exports.signup = catchAsync(async (req, res) => {
  // Creating user data to save on the database
  const newUser = await User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    picture: req.body.picture,
  });

  // Singing a jwt token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if the user is exist and password matches
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Everything is ok, let the user login
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token: token,
  });
});
