require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🌿 أهلاً بك في NoorAlHidayaAI\n\nأسأل ما تشاء في القرآن الكريم والسنة النبوية، وسأحاول مساعدتك بإذن الله.\n\nنسأل الله أن يجعل هذا العمل خالصًا لوجهه الكريم.");
});

console.log("NoorAlHidayaAI Bot is running...");