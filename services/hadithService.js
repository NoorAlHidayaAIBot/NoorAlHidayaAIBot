const bukhari = require("../database/bukhari.json");
const muslim = require("../database/muslim.json");
const tirmidhi = require("../database/tirmidhi.json");

const books = [
  {
    name: "📖 صحيح البخاري",
    hadiths: bukhari.hadiths
  },
  {
    name: "📘 صحيح مسلم",
    hadiths: muslim.hadiths
  },
  {
    name: "📙 جامع الترمذي",
    hadiths: tirmidhi.hadiths
  }
];

function searchHadith(query) {
  query = query.trim();

  const results = [];

  for (const book of books) {
    for (const hadith of book.hadiths) {

      const text = hadith.arabic || "";
      const number = String(hadith.idInBook || "");

      if (
        text.includes(query) ||
        number === query
      ) {
        results.push({
          book: book.name,
          number: hadith.idInBook,
          text: text
        });
      }

      if (results.length >= 5) break;
    }

    if (results.length >= 5) break;
  }

  return results;
}

module.exports = {
  searchHadith
};