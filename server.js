const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const depositRouter = require("./routes/depositRoute");
const expenseRouter = require("./routes/expenseRoute");
const withdrawRouter = require("./routes/withdrawRoute");
const commonRoute = require("./routes/commonRoute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// app.use("/auth",userRouter);
app.use("/user", userRouter);
app.use("/deposit", depositRouter);
app.use("/expense", expenseRouter);
app.use("/withdraw", withdrawRouter);
app.use("/sys", commonRoute);

app.listen(port, function (error) {
  if (error) {
    console.log("Server connected failed");
  } else {
    console.log(`Server ruunning port: ${port}`);
  }
});
