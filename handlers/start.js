const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { welcomeMessage } = require("../utils/messages");
const { searchHadith } = require("../services/hadithService");

const waitingForHadithSearch = new Set();

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

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  if (text === "/start") {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      welcomeMessage,
      keyboard
    );
  }

  if (text === "📚 الأحاديث") {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      `📚 قسم الأحاديث النبوية

اختر الخدمة التي تريدها:`,
      hadithKeyboard
    );
  }

  if (text === "⬅️ العودة للقائمة الرئيسية") {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      welcomeMessage,
      keyboard
    );
  }

  if (
    text === "📖 صحيح البخاري" ||
    text === "📘 صحيح مسلم" ||
    text === "📙 جامع الترمذي"
  ) {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      `يمكنك الآن الضغط على:

🔍 البحث عن حديث`
    );
  }

  if (text === "🔍 البحث عن حديث") {

    waitingForHadithSearch.add(chatId);

    return bot.sendMessage(
      chatId,
      "✍️ اكتب كلمة أو جزءًا من الحديث أو رقم الحديث."
    );
  }

  if (waitingForHadithSearch.has(chatId)) {

    waitingForHadithSearch.delete(chatId);

    await bot.sendMessage(chatId, "🔎 جاري البحث...");

    const results = searchHadith(text);

    if (!results.length) {
      return bot.sendMessage(
        chatId,
        "❌ لم يتم العثور على أي حديث."
      );
    }

    let message = "📚 نتائج البحث:\n\n";

    results.forEach((hadith, index) => {
      message += `${index + 1}- ${hadith.book}\n`;
      message += `🔢 رقم الحديث: ${hadith.number}\n\n`;
      message += `${hadith.text}\n\n`;
      message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    });

    return bot.sendMessage(chatId, message);
  }

});

module.exports = bot;