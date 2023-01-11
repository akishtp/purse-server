const express = require("express");
const {
  getAccounts,
  addAccount,
  deleteAccount,
  updateAccount,
} = require("../controllers/accountControllers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getAccounts);
router.post("/", addAccount);
router.delete("/:id", deleteAccount);
router.put("/:id", updateAccount);

module.exports = router;
