const express = require("express");
const { newWithdraw, withdrawList, withdrawDetails, editWithdraw } = require("../controllers/withdrawController");
const router = express.Router();

router.post("/newwithdraw", newWithdraw);
router.get("/withdrawlist", withdrawList);
router.get("/withdrawdetails/:id", withdrawDetails);
router.post("/editwithdraw/:id", editWithdraw);
// router.delete("/deletewithdraw/:id", deleteWithdraw);

module.exports = router;
