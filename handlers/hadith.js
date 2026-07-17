const bot = require("../config/bot");

bot.on("message", (msg) => {
  console.log("MESSAGE:", msg.text);

  bot.sendMessage(msg.chat.id, `وصلني: ${msg.text}`);
});