require("dotenv").config();

// تشغيل البوت
require("./config/bot");

// تحميل المعالجات
require("./handlers/start");
require("./handlers/menu");

console.log("🌿 NoorAlHidayaAI Bot Started Successfully");