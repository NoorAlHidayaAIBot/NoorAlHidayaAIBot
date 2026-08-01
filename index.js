require("dotenv").config();

require("./config/bot");

require("./handlers/start");
require("./handlers/about");
require("./handlers/language");
require("./handlers/brain");

console.log("🌿 NoorAlHidayaAI Bot Started Successfully");