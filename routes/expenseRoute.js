const express = require("express");
const { newExpense, expenseList } = require("../controllers/expenseController");
const router = express.Router();

router.post("/newexpense", newExpense);
router.get("/expenselist", expenseList);

module.exports = router;
