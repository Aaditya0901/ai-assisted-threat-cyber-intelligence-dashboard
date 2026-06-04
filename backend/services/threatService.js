const axios = require("axios");

const checkIPThreat = async (ip) => {
  try {
    const response = await axios.get(
      "https://api.abuseipdb.com/api/v2/check",
      {
        params: {
          ipAddress: ip,
          maxAgeInDays: 90,
        },
        headers: {
          Key: process.env.ABUSEIPDB_API_KEY,
          Accept: "application/json",
        },
      }
    );

    return response.data.data;

  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
};

module.exports = { checkIPThreat };