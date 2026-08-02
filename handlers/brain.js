const bot = require("../config/bot");
const { getSmartReply } = require("../services/brainService");
const { askAI } = require("../services/aiService");

bot.on("message", async (msg) => {

    const chatId = msg.chat.id;
    const text = msg.text;

    if (!text) return;

    const ignored = [
        "/start",
        "📖 تفسير القرآن",
        "📚 الأحاديث",
        "⚖️ الفقه الإسلامي",
        "🤲 الأذكار",
        "🌐 تغيير اللغة",
        "🤖 عن البوت",
        "🤖 About Bot",
        "🤖 À propos",
        "🔍 البحث عن حديث",
        "📖 صحيح البخاري",
        "📘 صحيح مسلم",
        "📙 جامع الترمذي",
        "⬅️ العودة للقائمة الرئيسية",
        "🇸🇦 العربية",
        "🇬🇧 English",
        "🇫🇷 Français"
    ];

    if (ignored.includes(text)) return;

    const localReply = getSmartReply(text);

    if (localReply) {
        return bot.sendMessage(chatId, localReply);
    }

    await bot.sendMessage(chatId, "🤖 أفكر...");

    const aiReply = await askAI(text);

    return bot.sendMessage(chatId, aiReply);

});

module.exports = bot;