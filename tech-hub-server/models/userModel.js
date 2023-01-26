const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: {
      string: String,
      required: [true, "User must have a fullname"],
      trim: true,
    },
  },
  userName: {
    type: String,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords are not the same",
    },
  },
  picture: {
    type: String,
    default: "https://i.ibb.co/HxwWZwc/dummy-use-image.jpg",
    validate: {
      validator: function (url) {
        return /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g.test(url);
      },
      message: (props) => `${props.value} is not a valid picture!`,
    },
  },
});

// PRE-SAVE HOOK TO CREATE A USERNAME
userSchema.pre("save", function (next) {
  // User name only change if userName modified
  if (this.isModified("userName")) return next();

  // Creating userName
  const randomNum = Math.round(Math.random() * 10000);
  const fullNameWords = this.fullName.split(" ").join("-");
  const userName = `${fullNameWords}${randomNum}`;
  this.userName = userName;

  next();
});

// PRE-SAVE HOOK TO HASH THE PASSWORD
userSchema.pre("save", async function (next) {
  // Password only change if the password modified
  if (!this.isModified("password")) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 10);

  // Delete the confirmPassword field
  this.confirmPassword = undefined;

  next();
});

// DELETE PASSWORD FILED AFTER CREATING A DOCUMENT
userSchema.post("save", function (doc, next) {
  // Delete mongoose default field and password
  doc.__v = undefined;
  doc.password = undefined;

  next();
});

// DEFINE A INSTANCE METHOD ON USER SCHEMA TO CHECK PASSWORD
userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
