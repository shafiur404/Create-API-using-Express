const express = require("express");
const { loginUser, registerUser, userList, editUser } = require("../controllers/userController");
const router = express.Router();

router.post('/login', loginUser);
router.post('/newuser', registerUser);
router.get('/userlist', userList);
router.put('/edituser', editUser);

module.exports = router;
