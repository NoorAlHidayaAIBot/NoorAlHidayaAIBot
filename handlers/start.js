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

  // /start
  if (text === "/start") {
    waitingForHadithSearch.delete(chatId);
    return bot.sendMessage(chatId, welcomeMessage, keyboard);
  }

  // عن البوت
  if (text === "🤖 عن البوت") {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(chatId, `🤖 عن البوت

🌿 نور الهداية AI

بوت إسلامي ذكي يهدف إلى نشر العلم الشرعي الصحيح وتسهيل الوصول إليه، وتقديم المعرفة الإسلامية بطريقة سهلة ودقيقة.

━━━━━━━━━━━━━━

📚 خدمات البوت:

📖 تفسير القرآن الكريم.
📚 البحث في الأحاديث النبوية.
⚖️ الفقه الإسلامي مع بيان أقوال المذاهب الأربعة.
🕌 الفتاوى والأحكام الشرعية.
📿 الأذكار والأدعية.
🌍 يدعم العربية والإنجليزية والفرنسية، ويجيب باللغة التي تكتب بها.

━━━━━━━━━━━━━━

👨‍💻 تصميم وتطوير:
ثامر الحجري

🌹 هذا العمل هدية للهادي وفاطمة، نسأل الله أن يبارك لهما، ويمنّ عليهما بالصحة والعافية، وأن يجعله صدقةً جاريةً في ميزان حسناتهما.

🤲 اللهم صلِّ وسلم وبارك على نبينا محمد ﷺ.`);
  }

  // قسم الأحاديث
  if (text === "📚 الأحاديث") {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      `📚 قسم الأحاديث النبوية

اختر الخدمة التي تريدها:`,
      hadithKeyboard
    );
  }

  // العودة للقائمة
  if (text === "⬅️ العودة للقائمة الرئيسية") {
    waitingForHadithSearch.delete(chatId);
    return bot.sendMessage(chatId, welcomeMessage, keyboard);
  }

  // اختيار كتاب
  if (
    text === "📖 صحيح البخاري" ||
    text === "📘 صحيح مسلم" ||
    text === "📙 جامع الترمذي"
  ) {
    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      `اضغط على:

🔍 البحث عن حديث`
    );
  }

  // البحث عن حديث
  if (text === "🔍 البحث عن حديث") {

    waitingForHadithSearch.add(chatId);

    return bot.sendMessage(
      chatId,
      "✍️ اكتب كلمة، أو جزءًا من الحديث، أو رقم الحديث."
    );
  }

  // تنفيذ البحث
  if (waitingForHadithSearch.has(chatId)) {

    waitingForHadithSearch.delete(chatId);

    await bot.sendMessage(chatId, "🔎 جاري البحث...");

    try {

      const results = searchHadith(text);

      if (!results || results.length === 0) {
        return bot.sendMessage(
          chatId,
          "❌ لم يتم العثور على أي حديث."
        );
      }

      let message = "📚 نتائج البحث:\n\n";

      results.forEach((hadith, index) => {

        message += `${index + 1}- ${hadith.book}
🔢 رقم الحديث: ${hadith.number}

${hadith.text}

━━━━━━━━━━━━━━━━━━━━

`;

      });

      return bot.sendMessage(chatId, message);

    } catch (err) {

      console.error(err);

      return bot.sendMessage(
        chatId,
        "⚠️ حدث خطأ أثناء البحث."
      );

    }

  }

});

module.exports = bot;