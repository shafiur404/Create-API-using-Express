const { AccessToken } = require("../config/accessToken");
const dotenv = require("dotenv").config();
const axios = require("axios");
const countries = '../data.countrylist.json'


const allCountries = async (req, res) => {
  const access_token = await AccessToken();

  const data = {
    code : 3000,
    data: countries
  }
};

module.exports = { allCountries };
