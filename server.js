const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/user",userRouter);

app.listen(port, function (error) {
  if (error) {
    console.log("Server connected failed");
  } else {
    console.log(`Server ruunning port: ${port}`);
  }
});
