const express = require("express");

const app = express();
const PORT = "4000";
app.get("/", (req, res) => {
  res.send("Here I am");
});
app.listen(PORT, function (error) {
  if (error) {
    console.log("Server connected failed");
  } else {
    console.log(`Server ruunning port: ${PORT}`);
  }
});
