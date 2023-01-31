const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newDeposit = async (req, res) => {
  const {
    amount,
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
          Name: {
            first_name: first_name,
            last_name: last_name,
          },
          email: email,
          deposit_date: deposit_date,
          amount: amount,
          phone: phone,
          transaction_type: transaction_type,
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

const depositDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/All_Deposits/${req.params.id}`, {
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

const editDeposit = async (req, res) => {
  const access_token = await AccessToken();
  const { 
    id, 
    amount,
    deposit_date,
    email,
    first_name,
    last_name,
    phone,
    remark,
    transaction_type 
  } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/All_Deposits/${req.params.id}`,
      {
        data: {
          Name: {
            first_name: first_name,
            last_name: last_name,
          },
          email: email,
          deposit_date: deposit_date,
          amount: amount,
          phone: phone,
          transaction_type: transaction_type,
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

module.exports = { newDeposit, depositList, depositDetails, editDeposit };
