const get_Data = (req, res) => {
  res.send({ "Here I am": process.env.PORT });
};

const post_Data = (req, res) => {
  const mail = "shafiur@gmail.com";
  const pass = "123456";
  const { email, password } = req.body;
  console.log("Email: ", req.body.email);
  if (email === mail && password === pass) {
    res.send("Login Success!");
  } else {
    res.send("Login Failed!");
  }
};

module.exports = { get_Data, post_Data };
