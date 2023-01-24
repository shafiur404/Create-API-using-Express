const express = require("express");
const { loginUser, registerUser, userList } = require("../controllers/userController");
const router = express.Router();

router.post('/login', loginUser);
router.post('/newuser', registerUser);
router.get('/userlist', userList);

module.exports = router;
