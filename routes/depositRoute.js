const express = require("express");
const { newDeposit, depositList, depositDetails, editDeposit } = require("../controllers/depositController");
const router = express.Router();

router.post("/newdeposit", newDeposit);
router.get("/depositlist", depositList);
router.get("/depositdetails/:id", depositDetails);
router.post("/editdeposit/:id", editDeposit);

module.exports = router;
