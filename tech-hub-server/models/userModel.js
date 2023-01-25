const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: {
      string: String,
      required: [true, "User must have a fullname"],
      trim: true,
    },
  },
  userName: String,
  email: {
    type: String,
    required: [true, "User must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minLength: [8, "Password must have more or equal 8 charecters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
  },
  picture: {
    type: String,
    validate: {
      validator: function (url) {
        return /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g.test(url);
      },
      message: (props) => `${props.value} is not a valid picture!`,
    },
  },
});

userSchema.pre("save", function (next) {
  const randomNum = Math.round(Math.random() * 10000);
  const fullNameWords = this.fullName.split(" ").join("-");
  const userName = `${fullNameWords}${randomNum}`;
  this.userName = userName;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
