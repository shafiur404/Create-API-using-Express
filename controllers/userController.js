const { AccessToken } = require("../Config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");
const generateToken = require("../Config/generateToken");

const loginUser = async (req, res) => {
  const access_token = await AccessToken();
  // console.log(access_token);

  const { email, password } = req.body;

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Users?criteria=(Email="${email}") %26%26 (Password="${password}")`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      //console.log(response.data.data[0].ID);
      console.log(response.data);
      //res.json(response.data.message);
      res.json({
        data: response.data.data,
        token: generateToken(
          response.data.data[0].ID,
          response.data.data[0].Password
        ),
      });
    })
    .catch(function (error) {
      console.log(error.message);
      res.json(error.message);
    });
};

module.exports = { loginUser };
