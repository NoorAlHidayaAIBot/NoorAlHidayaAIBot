const bot = require("../config/bot");

bot.on("message", async (msg) => {

    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    if (
        text === "🤖 عن البوت" ||
        text === "🤖 About Bot" ||
        text === "🤖 À propos"
    ) {

        return bot.sendMessage(chatId, `🤖 NoorAlHidayaAI

🌿 مساعد إسلامي ذكي.

━━━━━━━━━━━━━━

📖 تفسير القرآن الكريم.

📚 البحث في الأحاديث النبوية.

⚖️ الفقه الإسلامي.

🕌 الفتاوى.

🤲 الأذكار.

🌍 يدعم العربية والإنجليزية والفرنسية.

━━━━━━━━━━━━━━

👨‍💻 تصميم وتطوير

ثامر الحجري

🌹 نسأل الله أن يجعله صدقة جارية.

اللهم صل وسلم على نبينا محمد ﷺ`);
    }

});

module.exports = bot;