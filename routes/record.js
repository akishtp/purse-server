const express = require("express");
const { addRecord, getRecord } = require("../controllers/recordCOntroller");

const router = express.Router();

router.get("/", getRecord);
router.post("/", addRecord);

module.exports = router;
