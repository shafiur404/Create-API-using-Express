const express = require("express");
const { newDeposit, depositList } = require("../controllers/depositController");
const router = express.Router();

router.post("/newdeposit", newDeposit);
router.get("/depositlist", depositList);

module.exports = router;
