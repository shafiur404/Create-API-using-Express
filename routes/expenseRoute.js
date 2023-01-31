const express = require("express");
const { newExpense, expenseList, expenseDetails, editExpense } = require("../controllers/expenseController");
const router = express.Router();

router.post("/newexpense", newExpense);
router.get("/expenselist", expenseList);
router.get("/expensedetails/:id", expenseDetails);
router.post("/editexpense/:id", editExpense);

module.exports = router;
