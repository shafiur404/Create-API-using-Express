const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newDeposit = async (req, res) => {
  const {
    amount,
    name,
    deposit_date,
    email,
    first_name,
    last_name,
    phone,
    remark,
    transaction_type,
   
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/Deposit`,
      {
        data: {
          name: name,
          email: email,
          deposit_date: deposit_date,
          amount: amount,
          phone: phone,
          transaction_type: transaction_type,
          Name: {
            first_name: first_name,
            last_name: last_name,
          },
          remark: remark,
        },
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.json(error.message);
    });
};

const depositList = async (req, res) => { 
  const access_token = await AccessToken();

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deposits`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

};

module.exports = { newDeposit, depositList };
