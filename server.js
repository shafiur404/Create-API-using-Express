const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = "4000";
app.get("/razu", (req, res) => {
    // console.log(process.env.PORT);
  res.send({"Here I am": process.env.PORT});
});
app.listen(PORT, function (error) {
  if (error) {
    console.log("Server connected failed");
  } else {
    console.log(`Server ruunning port: ${PORT}`);
  }
});
