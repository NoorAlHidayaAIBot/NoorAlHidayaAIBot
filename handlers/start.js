const bot = require("../config/bot");
const { getMenu } = require("../keyboards/dynamicMenu");
const { getLanguage } = require("../services/languageService");
const translations = require("../utils/translations");
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

  const language = getLanguage(chatId);
  const t = translations[language] || translations.ar;

  // /start
  if (text === "/start") {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      t.welcome,
      getMenu(language)
    );
  }

  // العودة للقائمة الرئيسية
  if (text === "⬅️ العودة للقائمة الرئيسية") {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      t.welcome,
      getMenu(language)
    );
  }

  // قسم الأحاديث
  if (
    text === "📚 الأحاديث" ||
    text === "📚 Hadith" ||
    text === "📚 Hadiths"
  ) {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      "📚 قسم الأحاديث\n\nاختر الخدمة التي تريدها:",
      hadithKeyboard
    );
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
      "اضغط على:\n\n🔍 البحث عن حديث"
    );
  }

  // البحث
  if (text === "🔍 البحث عن حديث") {

    waitingForHadithSearch.add(chatId);

    return bot.sendMessage(
      chatId,
      "✍️ اكتب كلمة، أو جزءًا من الحديث، أو رقم الحديث."
    );
  }

  // تنفيذ البحث
  if (waitingForHadithSearch.has(chatId)) {

    const bot = require("../config/bot");
const { getMenu } = require("../keyboards/dynamicMenu");
const { getLanguage } = require("../services/languageService");
const translations = require("../utils/translations");
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

  const language = getLanguage(chatId);
  const t = translations[language] || translations.ar;

  // رسالة البداية
  if (text === "/start") {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      t.welcome,
      {
        ...getMenu(language),
        parse_mode: "Markdown"
      }
    );
  }

  // العودة للقائمة الرئيسية
  if (text === "⬅️ العودة للقائمة الرئيسية") {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      t.welcome,
      {
        ...getMenu(language),
        parse_mode: "Markdown"
      }
    );
  }

  // قسم الأحاديث
  if (
    text === "📚 الأحاديث" ||
    text === "📚 Hadith" ||
    text === "📚 Hadiths"
  ) {

    waitingForHadithSearch.delete(chatId);

    return bot.sendMessage(
      chatId,
      "📚 *قسم الأحاديث النبوية*\n\nاختر الخدمة التي تريدها:",
      {
        ...hadithKeyboard,
        parse_mode: "Markdown"
      }
    );
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
      "📚 اختر البحث ثم اكتب:\n\n🔍 كلمة\nأو جزءًا من الحديث\nأو رقم الحديث."
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

      let message = "📚 *نتائج البحث*\n\n";

      results.forEach((hadith, index) => {

        message += `*${index + 1}.* ${hadith.book}

🔢 رقم الحديث: *${hadith.number}*

${hadith.text}

━━━━━━━━━━━━━━━━━━━━

`;

      });

      return bot.sendMessage(
        chatId,
        message,
        {
          parse_mode: "Markdown"
        }
      );

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