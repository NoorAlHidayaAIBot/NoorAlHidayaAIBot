const bot = require("../config/bot");
const { searchHadith } = require("../services/hadithService");

const waiting = new Set();

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  if (text === "🔍 البحث عن حديث") {
    waiting.add(chatId);

    return bot.sendMessage(
      chatId,
      "✍️ اكتب كلمة، أو جزءًا من الحديث، أو رقم الحديث."
    );
  }

  if (!waiting.has(chatId)) return;

  waiting.delete(chatId);

  await bot.sendMessage(chatId, "🔎 جاري البحث...");

  const results = searchHadith(text);

  if (!results.length) {
    return bot.sendMessage(
      chatId,
      "❌ لم يتم العثور على أي حديث."
    );
  }

  let message = "📚 نتائج البحث:\n\n";

  results.forEach((h, i) => {
    message += `${i + 1}- ${h.book}
🔢 رقم الحديث: ${h.number}

${h.text}

━━━━━━━━━━━━━━━━━━━━

`;
  });

  return bot.sendMessage(chatId, message);

});