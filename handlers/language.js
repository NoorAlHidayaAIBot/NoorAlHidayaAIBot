const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { setLanguage } = require("../services/languageService");

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
  if (text === "🌐 تغيير اللغة") {
    return bot.sendMessage(
      chatId,
      "🌐 اختر اللغة:",
      languageKeyboard
    );
  }

  // العربية
  if (text === "🇸🇦 العربية") {

    setLanguage(chatId, "ar");

    return bot.sendMessage(
      chatId,
      "✅ تم تغيير اللغة إلى العربية.",
      keyboard
    );
  }

  // الإنجليزية
  if (text === "🇬🇧 English") {

    setLanguage(chatId, "en");

    return bot.sendMessage(
      chatId,
      "✅ Language changed to English.",
      keyboard
    );
  }

  // الفرنسية
  if (text === "🇫🇷 Français") {

    setLanguage(chatId, "fr");

    return bot.sendMessage(
      chatId,
      "✅ Langue changée en français.",
      keyboard
    );
  }

});