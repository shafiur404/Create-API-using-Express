const express = require("express");
const {
  loginUser,
  registerUser,
  userList,
  userDetails,
  editUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUser);
router.post("/newuser", registerUser);
router.get("/userlist", userList);
router.get("/userdetails/:id", userDetails);
router.post("/edituser/:id", editUser);

module.exports = router;
