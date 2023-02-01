const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");

const newAsset = async (req, res) => {
  const {
    amount,
    asset_name,
    assign_user,
    remark,
    transaction_type,
    assign_date,
    status,
  } = req.body;

  const access_token = await AccessToken(req);

  // console.log("Access token", access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/Asset`,
      {
        data: {
          amount: amount,
          assign_date: assign_date,
          transaction_type: transaction_type,
          asset_name: asset_name,
          assign_user:assign_user,
          remark: remark,
          status:status,
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

const assetList = async (req, res) => { 
  const access_token = await AccessToken();

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Assets`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      const data = response.data.data.map((item) => {
        console.log("Salary Item:",item);
        return {
          ...item,
          id: item?.ID,
          name: item?.assign_user.display_value,
          // name: item?.name.ID,
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

const assetDetails = async (req, res) => {
  const access_token = await AccessToken();
  // const { id } = req.body;
  console.log("user id: ", req.params.id);
  await axios
    .get(`${process.env.ZOHO_API}/report/All_Assets/${req.params.id}`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    })
    .then(function (response) {
      console.log("Edit Salary: ",response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const editAsset = async (req, res) => {
  const access_token = await AccessToken();
  const { 
    id, 
    amount,
    asset_name,
    assign_user,
    remark,
    transaction_type,
    assign_date,
    status,
   } = req.body;
  console.log("user id: ", id);
  await axios
    .patch(
      `${process.env.ZOHO_API}/report/All_Assets/${req.params.id}`,
      {
        data: {
          amount: amount,
          assign_date: assign_date,
          transaction_type: transaction_type,
          asset_name: asset_name,
          assign_user:assign_user,
          remark: remark,
          status:status,
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

module.exports = { newAsset, assetList, assetDetails, editAsset };
