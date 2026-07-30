const bot = require("../config/bot");
const { getTafsir } = require("../services/quranService");

const waitingForVerse = new Set();

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!text) return;

  // فتح قسم التفسير
  if (text === "📖 تفسير القرآن") {
    waitingForVerse.add(chatId);

    return bot.sendMessage(
      chatId,
      "📖 أرسل رقم السورة والآية بهذا الشكل:\n\n1:1\n2:255\n18:10"
    );
  }

  // إذا لم يكن المستخدم في وضع التفسير
  if (!waitingForVerse.has(chatId)) return;

  waitingForVerse.delete(chatId);

  const parts = text.split(":");

  if (parts.length !== 2) {
    return bot.sendMessage(
      chatId,
      "❌ الصيغة غير صحيحة.\n\nاكتب هكذا:\n1:1"
    );
  }

  const surah = parseInt(parts[0]);
  const ayah = parseInt(parts[1]);

  if (isNaN(surah) || isNaN(ayah)) {
    return bot.sendMessage(
      chatId,
      "❌ يجب أن يكون رقم السورة والآية أرقامًا فقط.\n\nمثال:\n2:255"
    );
  }

  await bot.sendMessage(chatId, "🔎 جاري جلب التفسير...");

  try {
    const data = await getTafsir(surah, ayah);

    if (!data) {
      return bot.sendMessage(
        chatId,
        "❌ لم يتم العثور على الآية أو التفسير."
      );
    }

    return bot.sendMessage(
      chatId,
`📖 سورة ${data.surah.name}
🔢 الآية ${data.numberInSurah}

🕋 ${data.text}`
    );

  } catch (err) {
    console.error(err);

    return bot.sendMessage(
      chatId,
      "⚠️ حدث خطأ أثناء جلب التفسير."
    );
  }
});

module.exports = bot;