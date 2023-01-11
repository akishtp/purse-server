const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
} = require("../controllers/userControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.use(requireAuth).put("/profile", updateUser);

module.exports = router;
