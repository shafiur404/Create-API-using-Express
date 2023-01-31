const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newSalary = async (req, res) => {
  const {
    amount,
    email,
    employee_name,
    bonus_category,
    phone,
    remark,
    transaction_type,
    paid_date,
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/Salary`,
      {
        data: {
          email: email,
          amount: amount,
          paid_date: paid_date,
          phone: phone,
          bonus_category: bonus_category,
          transaction_type: transaction_type,
          employee_name: employee_name,
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

const salaryList = async (req, res) => { 
  const access_token = await AccessToken();

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Salaries`,
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
          // name: item?.employee_name,
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

const salaryDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/All_Salaries/${req.params.id}`, {
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

const editSalary = async (req, res) => {
  const access_token = await AccessToken();
  const { 
    id, 
    amount,
    email,
    employee_name,
    bonus_category,
    phone,
    remark,
    transaction_type,
    paid_date,
   } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/All_Salaries/${req.params.id}`,
      {
        data: {
          email: email,
          amount: amount,
          paid_date: paid_date,
          phone: phone,
          bonus_category: bonus_category,
          transaction_type: transaction_type,
          // employee_name: employee_name,
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

module.exports = { newSalary, salaryList, salaryDetails, editSalary };
