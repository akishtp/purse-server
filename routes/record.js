const express = require("express");
const {
  addRecord,
  getRecord,
  deleteRecord,
} = require("../controllers/recordCOntroller");

const router = express.Router();

router.get("/", getRecord);
router.post("/", addRecord);
router.delete("/:id", deleteRecord);

module.exports = router;
