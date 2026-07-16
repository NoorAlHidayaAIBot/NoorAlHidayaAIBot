const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

if (!token) {
    throw new Error("BOT_TOKEN not found in .env");
}

const bot = new TelegramBot(token, {
    polling: true
});

module.exports = bot;