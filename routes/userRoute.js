const express = require('express');

const router = express.Router();

//Get data using API
router.get("/razu", (req, res) => {
    res.send({ "Here I am": process.env.PORT });
  });

//Post data using API
router.post("/shafiur", (req, res) => {
    const mail = "shafiur@gmail.com";
    const pass = "123456";
    const { email, password } = req.body;
    console.log("Email: ", req.body.email);
    if (email === mail && password === pass) {
      res.send("Login Success!");
    } else {
      res.send("Login Failed!");
    }
  });

  module.exports = router;

