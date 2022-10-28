const express = require("express");
const {
  addRecord,
  getRecord,
  deleteRecord,
} = require("../controllers/recordController");

const router = express.Router();

router.get("/", getRecord);
router.post("/", addRecord);
router.delete("/:id", deleteRecord);

module.exports = router;
