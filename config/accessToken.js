const axios = require("axios");
const dotenv = require("dotenv").config();

//node - cache
const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100 });

const AccessToken = async () => {
  console.log(process.env.ZOHO_ACCESS_TOKEN);

  if (myCache.has("accesstoken")) {
    console.log("access token from cache.");
    return myCache.get("accesstoken");
  } else {
    await axios
      .post(
        `${process.env.ZOHO_ACCESS_TOKEN}=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`
      )
      .then(function (response) {
        const access_token_getdata = response.data.access_token;
        myCache.set("accesstoken", access_token_getdata);
        console.log("access token update");
        return access_token_getdata;
      });

    return myCache.get("accesstoken");
  }
};

module.exports = { AccessToken };
