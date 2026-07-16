const bot = require("../config/bot");
const keyboard = require("../keyboards/mainMenu");

bot.onText(/^\/start$/, (msg) => {
  const chatId = msg.chat.id;

  const welcomeMessage = `السلام عليكم ورحمة الله وبركاته 🌿

أهلاً بك في نور الهداية.

نسأل الله أن يبارك في الهادي وفاطمة، وأن يرزقهما الصحة والعافية والبركة، وأن يجعل هذا العمل خالصًا لوجهه الكريم.

اللهم صل وسلم وبارك على سيدنا محمد ﷺ.

يمكنك سؤالي عن:

📖 تفسير القرآن الكريم.
📚 الأحاديث النبوية الصحيحة.
⚖️ الفقه الإسلامي مع بيان أقوال المذاهب الأربعة.
🌍 يمكنك الكتابة بأي لغة، وسأجيبك باللغة نفسها بإذن الله.`;

  bot.sendMessage(chatId, welcomeMessage, keyboard);
});

module.exports = bot;