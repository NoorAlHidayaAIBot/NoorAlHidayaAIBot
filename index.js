require("dotenv").config();

require("./config/bot");

require("./handlers/start");
require("./handlers/hadith");
require("./handlers/about");
require("./handlers/tafsir");

console.log("🌿 NoorAlHidayaAI Bot Started Successfully");