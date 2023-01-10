const express = require("express");
const {
  addRecord,
  getRecord,
  deleteRecord,
  updateRecord,
} = require("../controllers/recordController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getRecord);
router.post("/", addRecord);
router.delete("/:id", deleteRecord);
router.put("/:id", updateRecord);

module.exports = router;
