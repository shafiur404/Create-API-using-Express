const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newWithdraw = async (req, res) => {
  const {
    amount,
    email,
    first_name,
    last_name,
    phone,
    remark,
    transaction_type,
    withdraw_date,
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/Withdraw`,
      {
        data: {
          email: email,
          amount: amount,
          withdraw_date: withdraw_date,
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

const withdrawList = async (req, res) => { 
  const access_token = await AccessToken();

  await axios
    .get(
      `${process.env.ZOHO_API}/report/Withdraw_Report`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      const data = response.data.data.map((item) => {
        return {
          ...item,
          // full_name: item?.Name?.display_value,
          id: item.ID,
          name: item?.Name?.display_value,
        };
      });
      const values = {
        code: 3000,
        data,
      };
      res.status(200).json(values);
    })
    .catch(function (error) {
      console.log(error);
    });

};

const withdrawDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/Withdraw_Report/${req.params.id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    })
    .then(function (response) {
      console.log("Withdraw Details: ",response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const editWithdraw = async (req, res) => {
  const access_token = await AccessToken();
  const { 
    id, 
    amount,
    email,
    first_name,
    last_name,
    phone,
    remark,
    transaction_type,
    withdraw_date,
   } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/Withdraw_Report/${req.params.id}`,
      {
        data: {
          email: email,
          amount: amount,
          withdraw_date: withdraw_date,
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
    });
};

module.exports = { newWithdraw, withdrawList, withdrawDetails, editWithdraw };
