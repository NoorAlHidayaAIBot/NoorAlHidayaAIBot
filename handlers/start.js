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
    resize_keyboard: true,
    is_persistent: true
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

اختر الخدمة التي تريدها من القائمة التالية:`,
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

  if (msg.text === "📖 صحيح البخاري") {
    return bot.sendMessage(
      msg.chat.id,
`📖 صحيح البخاري

مرحبًا بك في قسم صحيح البخاري.

اختر طريقة البحث:

🔍 البحث برقم الحديث
📝 البحث بكلمة
📚 تصفح الأبواب

🚧 سيتم قريبًا ربط هذا القسم بقاعدة بيانات كاملة لصحيح البخاري بإذن الله.`
    );
  }

  if (msg.text === "📘 صحيح مسلم") {
    return bot.sendMessage(
      msg.chat.id,
`📘 صحيح مسلم

مرحبًا بك في قسم صحيح مسلم.

🚧 سيتم قريبًا ربط هذا القسم بقاعدة بيانات كاملة لصحيح مسلم بإذن الله.`
    );
  }

  if (msg.text === "📙 جامع الترمذي") {
    return bot.sendMessage(
      msg.chat.id,
`📙 جامع الترمذي

مرحبًا بك في قسم جامع الترمذي.

🚧 سيتم قريبًا ربط هذا القسم بقاعدة بيانات كاملة لجامع الترمذي بإذن الله.`
    );
  }

  if (msg.text === "🔍 البحث عن حديث") {
    return bot.sendMessage(
      msg.chat.id,
`🔎 البحث عن حديث

أرسل الآن:

• رقم الحديث.
أو
• كلمة من الحديث.

وسيتم البحث عنه بإذن الله.`
    );
  }

});

module.exports = bot;