const express = require("express");
// const { newExpense, expenseList } = require("../controllers/expenseController");
const { allCountries } = require("../controllers/commonController")
const router = express.Router();

router.post("/countries", allCountries);

module.exports = router;
