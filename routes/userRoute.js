const express = require("express");
const { get_Data, post_Data } = require("../controllers/userController");
const router = express.Router();

//Get data using API
router.get("/razu", get_Data);

//Post data using API
router.post("/shafiur", post_Data);

module.exports = router;
