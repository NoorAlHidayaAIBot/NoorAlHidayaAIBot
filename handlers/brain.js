const bot = require("../config/bot");
const { getSmartReply } = require("../services/brainService");

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // تجاهل الأوامر والأزرار حتى لا تتعارض مع باقي الملفات
  const ignored = [
    "/start",
    "📚 الأحاديث",
    "📖 تفسير القرآن",
    "🤖 عن البوت",
    "🔍 البحث عن حديث",
    "📖 صحيح البخاري",
    "📘 صحيح مسلم",
    "📙 جامع الترمذي",
    "⬅️ العودة للقائمة الرئيسية"
  ];

  if (ignored.includes(text)) return;

  const reply = getSmartReply(text);

  if (reply) {
    return bot.sendMessage(chatId, reply);
  }

});

module.exports = bot;