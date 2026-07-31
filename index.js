require("dotenv").config();

require("./config/bot");

require("./handlers/start");
require("./handlers/brain");
require("./handlers/language");

console.log("🌿 NoorAlHidayaAI Bot Started Successfully");