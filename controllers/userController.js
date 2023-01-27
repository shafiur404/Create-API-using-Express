const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");
const generateToken = require("../config/generateToken");

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
        message: "user found",
        ID: response.data.data[0].ID,
        Email: response.data.data[0].Email,
        token: generateToken(
          response.data.data[0].ID,
          response.data.data[0].Password
        ),
      });
    })
    .catch(function (error) {
      console.log(error.message);
      res.json({ message: "incorrect email and password" });
      //res.json(error.message);
    });
};

const registerUser = async (req, res) => {
  const {
    password,
    address_line_1,
    city,
    country_id,
    designation,
    email,
    name,
    phone,
    state,
    status,
    joining_date,
    zip_code,
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/User`,
      {
        data: {
          Email: email,
          Name: name,
          Address: {
            address_line_1: address_line_1,
            country: country_id,
            postal_code: zip_code,
            state_province: state,
            district_city: city,
          },
          Phone_Number: phone,
          Status: status,
          Designation: designation,
          joining_date: joining_date,
          Password: password,
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

const userList = async (req, res) => {
  const access_token = await AccessToken();

  await axios
    .get(`${process.env.ZOHO_API}/report/All_Users`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    })
    .then(function (response) {
      console.log(response);
      // const data = response.data.data.map((item) => {
      //   return {
      //     ...item,
      //     full_address: item?.Address?.display_value,
      //   };
      // });
      // const values = {
      //   code: 3000,
      //   data,
      // };
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const userDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/All_Users/${req.params.id}`, {
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

const editUser = async (req, res) => {
  const access_token = await AccessToken();
  const { id, email, name } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/All_Users/${req.params.id}`,
      {
        data: {
          Email: email,
          Name: name,
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

module.exports = { loginUser, registerUser, userList, userDetails, editUser };
