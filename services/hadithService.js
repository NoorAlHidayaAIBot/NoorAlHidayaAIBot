const bukhari = require("../database/bukhari.json");
const muslim = require("../database/muslim.json");
const tirmidhi = require("../database/tirmidhi.json");

const books = [
  {
    id: "bukhari",
    name: "📖 صحيح البخاري",
    data: bukhari.hadiths || []
  },
  {
    id: "muslim",
    name: "📘 صحيح مسلم",
    data: muslim.hadiths || []
  },
  {
    id: "tirmidhi",
    name: "📙 جامع الترمذي",
    data: tirmidhi.hadiths || []
  }
];

function normalize(text = "") {
  return String(text)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function searchHadith(query) {

  const q = normalize(query);

  const results = [];

  const isNumber = /^\d+$/.test(query);

  for (const book of books) {

    for (const hadith of book.data) {

      if (!hadith) continue;

      const text = hadith.arabic || "";
      const number = String(hadith.idInBook || hadith.id || "");

      if (
        (isNumber && number === query) ||
        (!isNumber && normalize(text).includes(q))
      ) {

        results.push({
          book: book.name,
          number: number,
          text: text
        });

        if (results.length === 5) {
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