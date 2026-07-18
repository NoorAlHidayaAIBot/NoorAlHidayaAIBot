const bukhari = require("../database/bukhari.json");
const muslim = require("../database/muslim.json");
const tirmidhi = require("../database/tirmidhi.json");

const books = [
  { name: "📖 صحيح البخاري", hadiths: bukhari.hadiths },
  { name: "📘 صحيح مسلم", hadiths: muslim.hadiths },
  { name: "📙 جامع الترمذي", hadiths: tirmidhi.hadiths }
];

function normalize(text) {
  return (text || "")
    .replace(/[\u064B-\u065F\u0670]/g, "") // إزالة التشكيل
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim()
    .toLowerCase();
}

function searchHadith(query) {
  const q = normalize(query);
  const results = [];

  for (const book of books) {
    for (const hadith of book.hadiths) {
      const arabic = hadith.arabic || "";

      if (
        normalize(arabic).includes(q) ||
        String(hadith.idInBook) === query
      ) {
        results.push({
          book: book.name,
          number: hadith.idInBook,
          text: arabic
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