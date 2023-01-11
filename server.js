const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

//Get data using API
app.get("/razu", (req, res) => {
  res.send({ "Here I am": process.env.PORT });
});

//Post data using API
app.post("/shafiur", (req, res) => {
  const { email, password } = req.body;
  console.log("Email: ",req.body.email);
  res.send("You got your Data");
});

app.listen(port, function (error) {
  if (error) {
    console.log("Server connected failed");
  } else {
    console.log(`Server ruunning port: ${port}`);
  }
});
