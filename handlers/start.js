const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { welcomeMessage } = require("../utils/messages");

bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    welcomeMessage,
    keyboard
  );
});

module.exports = bot;