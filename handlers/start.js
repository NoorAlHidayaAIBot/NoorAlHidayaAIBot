const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { welcomeMessage } = require("../utils/messages");

bot.on("message", (msg) => {
  console.log(msg.text);

  if (msg.text === "/start") {
    return bot.sendMessage(
      msg.chat.id,
      welcomeMessage,
      keyboard
    );
  }
});

module.exports = bot;