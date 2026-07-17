const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");
const { welcomeMessage } = require("../utils/messages");

bot.on("message", (msg) => {
  console.log(msg.text);

  if (msg.text === "/start") {
    return bot.sendMessage(msg.chat.id, welcomeMessage, keyboard);
  }

  if (msg.text === "📚 الأحاديث") {
    return bot.sendMessage(msg.chat.id, "✅ زر الأحاديث يعمل.");
  }

  if (msg.text === "📖 تفسير القرآن") {
    return bot.sendMessage(msg.chat.id, "✅ زر التفسير يعمل.");
  }
});