const express = require("express");
const { newAsset, assetList, assetDetails, editAsset } = require("../controllers/assetController");
const router = express.Router();

router.post("/newasset", newAsset);
router.get("/assetlist", assetList);
router.get("/assetdetails/:id", assetDetails);
router.post("/editasset/:id", editAsset);
// router.post("/deleteasset/:id", deleteAsset);

module.exports = router;
