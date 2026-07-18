const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { welcomeMessage } = require("../utils/messages");

const hadithKeyboard = {
  reply_markup: {
    keyboard: [
      ["🔍 البحث عن حديث"],
      ["📖 صحيح البخاري", "📘 صحيح مسلم"],
      ["📙 جامع الترمذي"],
      ["⬅️ العودة للقائمة الرئيسية"]
    ],
    resize_keyboard: true
  }
};

bot.on("message", (msg) => {

  if (msg.text === "/start") {
    return bot.sendMessage(
      msg.chat.id,
      welcomeMessage,
      keyboard
    );
  }

  if (msg.text === "📚 الأحاديث") {
    return bot.sendMessage(
      msg.chat.id,
      `📚 قسم الأحاديث النبوية

مرحبًا بك في قسم الأحاديث.

اختر الخدمة التي تريدها:`,
      hadithKeyboard
    );
  }

  if (msg.text === "⬅️ العودة للقائمة الرئيسية") {
    return bot.sendMessage(
      msg.chat.id,
      welcomeMessage,
      keyboard
    );
  }

});

module.exports = bot;