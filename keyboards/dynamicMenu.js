const translations = require("../utils/translations");

function getMenu(language = "ar") {

  const t = translations[language] || translations.ar;

  return {
    reply_markup: {
      keyboard: [
        [t.buttons.tafsir, t.buttons.hadith],
        [t.buttons.fiqh, t.buttons.azkar],
        [t.buttons.language, t.buttons.about]
      ],
      resize_keyboard: true,
      is_persistent: true
    }
  };
}

module.exports = {
  getMenu
};