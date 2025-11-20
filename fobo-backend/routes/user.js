const express = require("express");
const router = express.Router();
const { estimateRideFare } = require("../controllers/userController");

router.post("/estimate", estimateRideFare);

module.exports = router;
