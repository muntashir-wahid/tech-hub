const express = require("express");

const { signup, login } = require("./../controllers/authController");
const {
  getUsers,
  getUser,
  deleteUser,
} = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getUsers);
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
