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
    return