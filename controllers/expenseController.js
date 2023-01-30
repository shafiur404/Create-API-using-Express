const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newExpense = async (req, res) => {
  const {
    amount,
    expense_date,
    email,
    expense_category,
    first_name,
    last_name,
    name,
    receipt,
    remark,
    transaction_type,
   
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/Expense`,
      {
        data: {
          email: email,
          name: name,
          expense_date: expense_date,
          expense_category: expense_category,
          amount: amount,
          transaction_type: transaction_type,
          Name: {
            first_name: first_name,
            last_name: last_name,
          },
          receipt: receipt,
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

const expenseList = async (req, res) => { 
  const access_token = await AccessToken();

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Expenses`,
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

module.exports = { newExpense, expenseList };
