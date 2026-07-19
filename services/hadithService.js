const bukhari = require("../database/bukhari.json");
const muslim = require("../database/muslim.json");
const tirmidhi = require("../database/tirmidhi.json");

function normalize(text = "") {
  return String(text)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[إأآ]/g, "ا")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\u0621-\u064A0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const allHadiths = [];

function loadBook(bookName, data) {

  if (!data || !Array.isArray(data.hadiths)) return;

  for (const hadith of data.hadiths) {

    if (!hadith || !hadith.arabic) continue;

    allHadiths.push({
      book: bookName,
      number: hadith.idInBook || hadith.id,
      text: hadith.arabic,
      normalized: normalize(hadith.arabic)
    });

  }

}

loadBook("📖 صحيح البخاري", bukhari);
loadBook("📘 صحيح مسلم", muslim);
loadBook("📙 جامع الترمذي", tirmidhi);

console.log(`✅ Loaded ${allHadiths.length} hadiths`);
function searchHadith(query) {

  const q = normalize(query);

  const results = [];

  for (const hadith of allHadiths) {

    if (
      String(hadith.number) === String(query).trim() ||
      hadith.normalized.includes(q)
    ) {

      results.push({
        book: hadith.book,
        number: hadith.number,
        text: hadith.text
      });

      if (results.length >= 5) {
        break;
      }
    }
  }

  return results;
}

module.exports = {
  searchHadith
};