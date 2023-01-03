const express = require("express");
const {
  addRecord,
  getRecord,
  deleteRecord,
} = require("../controllers/recordController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getRecord);
router.post("/", addRecord);
router.delete("/:id", deleteRecord);

module.exports = router;
