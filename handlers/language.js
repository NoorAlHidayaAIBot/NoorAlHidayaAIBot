const bot = require("../config/bot");
const { setLanguage, getLanguage } = require("../services/languageService");
const { getMenu } = require("../keyboards/dynamicMenu");

const languageKeyboard = {
  reply_markup: {
    keyboard: [
      ["🇸🇦 العربية"],
      ["🇬🇧 English"],
      ["🇫🇷 Français"],
      ["⬅️ العودة للقائمة الرئيسية"]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // فتح قائمة اللغات
  if (
    text === "🌐 تغيير اللغة" ||
    text === "🌐 Language" ||
    text === "🌐 Langue"
  ) {
    return bot.sendMessage(
      chatId,
      "🌐 اختر اللغة / Choose language / Choisissez la langue",
      languageKeyboard
    );
  }

  // العربية
  if (text === "🇸🇦 العربية") {

    setLanguage(chatId, "ar");

    return bot.sendMessage(
      chatId,
      "✅ تم تغيير اللغة إلى العربية.",
      getMenu(getLanguage(chatId))
    );
  }

  // الإنجليزية
  if (text === "🇬🇧 English") {

    setLanguage(chatId, "en");

    return bot.sendMessage(
      chatId,
      "✅ Language changed to English.",
      getMenu(getLanguage(chatId))
    );
  }

  // الفرنسية
  if (text === "🇫🇷 Français") {

    setLanguage(chatId, "fr");

    return bot.sendMessage(
      chatId,
      "✅ Langue changée en français.",
      getMenu(getLanguage(chatId))
    );
  }

});