const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", () => {});
router.post("/", () => {});
router.delete("/:id", () => {});
router.put("/:id", () => {});
