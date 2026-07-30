const axios = require("axios");

async function getTafsir(surah, ayah) {
  try {
    const response = await axios.get(
      `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.muyassar`
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  getTafsir
};