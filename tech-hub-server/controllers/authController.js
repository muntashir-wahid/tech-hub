const User = require("./../models/userModel");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
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
