const express = require("express");
const { newSalary, salaryList, salaryDetails, editSalary } = require("../controllers/salaryController");
const router = express.Router();

router.post("/newsalary", newSalary);
router.get("/salarylist", salaryList);
router.get("/salarydetails/:id", salaryDetails);
router.post("/editsalary/:id", editSalary);
// router.post("/deletesalary/:id", deleteSalary);

module.exports = router;
