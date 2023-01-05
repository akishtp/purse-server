const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/profile", updateUser);

module.exports = router;
