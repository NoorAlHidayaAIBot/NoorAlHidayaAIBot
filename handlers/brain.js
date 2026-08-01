const bot = require("../config/bot");
const { getSmartReply } = require("../services/brainService");

bot.on("message", async (msg) => {

    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    const ignored = [
        "/start",

        "📚 الأحاديث",
        "📚 Hadith",
        "📚 Hadiths",

        "📖 تفسير القرآن",
        "📖 Quran Tafsir",
        "📖 Tafsir du Coran",

        "🤖 عن البوت",
        "🤖 About Bot",
        "🤖 À propos",

        "🌐 تغيير اللغة",
        "🌐 Language",
        "🌐 Langue",

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