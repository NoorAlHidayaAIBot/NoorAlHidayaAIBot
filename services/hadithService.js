const axios = require("axios");

const BASE_URL = "https://ummahapi.com/api/hadith/search";

async function searchHadith(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        limit: 5
      }
    });

    if (
      !response.data ||
      !response.data.success ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      return [];
    }

    return response.data.data;
  } catch (error) {
    console.error("Hadith API Error:", error.message);
    return [];
  }
}

module.exports = {
  searchHadith
};