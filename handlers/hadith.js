const bot = require("../config/bot");

const hadithKeyboard = {
  reply_markup: {
    keyboard: [
      ["🔍 البحث عن حديث"],
      ["📖 صحيح البخاري", "📘 صحيح مسلم"],
      ["📙 جامع الترمذي"],
      ["⬅️ العودة للقائمة الرئيسية"]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

bot.on("message", (msg) => {
  if (msg.text === "📚 الأحاديث") {
    bot.sendMessage(
      msg.chat.id,
`📚 قسم الأحاديث النبوية

مرحبًا بك في قسم الأحاديث.

اختر الخدمة التي تريدها من القائمة التالية:`,
      hadithKeyboard
    );
  }
});

module.exports = bot;