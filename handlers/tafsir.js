const bot = require("../config/bot");
const { getTafsir } = require("../services/quranService");

const waitingForVerse = new Set();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  if (text === "📖 تفسير القرآن") {
    waitingForVerse.add(chatId);

    return bot.sendMessage(
      chatId,
      "📖 أرسل رقم السورة والآية بهذا الشكل:\n\n2:255\n\nمثال: 1:1"
    );
  }

  if (!waitingForVerse.has(chatId)) return;

  waitingForVerse.delete(chatId);

  const parts = text.split(":");

  if (parts.length !== 2) {
    return bot.sendMessage(
      chatId,
      "❌ الصيغة غير صحيحة.\nاكتب هكذا:\n2:255"
    );
  }

  const surah = parts[0];
  const ayah = parts[1];

  await bot.sendMessage(chatId, "🔎 جاري جلب التفسير...");

  const data = await getTafsir(surah, ayah);

  if (!data) {
    return bot.sendMessage(chatId, "❌ لم يتم العثور على الآية.");
  }

  bot.sendMessage(
    chatId,
    `📖 سورة ${data.surah.name}\n` +
    `🔹 الآية ${data.numberInSurah}\n\n` +
    `🕋 ${data.text}`
  );
});