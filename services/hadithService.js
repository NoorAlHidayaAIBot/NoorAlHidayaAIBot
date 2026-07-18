const bukhari = require("../database/bukhari.json");
const muslim = require("../database/muslim.json");
const tirmidhi = require("../database/tirmidhi.json");

const books = [
  {
    name: "📖 صحيح البخاري",
    hadiths: Array.isArray(bukhari.hadiths) ? bukhari.hadiths : []
  },
  {
    name: "📘 صحيح مسلم",
    hadiths: Array.isArray(muslim.hadiths) ? muslim.hadiths : []
  },
  {
    name: "📙 جامع الترمذي",
    hadiths: Array.isArray(tirmidhi.hadiths) ? tirmidhi.hadiths : []
  }
];

function normalize(text = "") {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim()
    .toLowerCase();
}

function searchHadith(query) {

  const q = normalize(String(query));
  const results = [];

  for (const book of books) {

    for (const hadith of book.hadiths) {

      if (!hadith) continue;

      const arabic = hadith.arabic || "";
      const number = String(hadith.idInBook || hadith.id || "");

      if (
        number === String(query) ||
        normalize(arabic).includes(q)
      ) {

        results.push({
          book: book.name,
          number,
          text: arabic
        });

        if (results.length >= 5) {
          return results;
        }
      }
    }
  }

  return results;
}

module.exports = {
  searchHadith
};