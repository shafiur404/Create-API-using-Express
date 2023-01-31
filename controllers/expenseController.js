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
    phone,
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
          expense_date: expense_date,
          expense_category: expense_category,
          amount: amount,
          phone: phone,
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

const expenseDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/All_Expenses/${req.params.id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const editExpense = async (req, res) => {
  const access_token = await AccessToken();
  const { 
    id, 
    amount,
    expense_date,
    email,
    expense_category,
    first_name,
    last_name,
    phone,
    remark,
    transaction_type,
   } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/All_Expenses/${req.params.id}`,
      {
        data: {
          email: email,
          expense_date: expense_date,
          expense_category: expense_category,
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
    });
};

module.exports = { newExpense, expenseList, expenseDetails, editExpense };
