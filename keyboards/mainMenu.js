const keyboard = {
  reply_markup: {
    keyboard: [
      ["📖 تفسير القرآن", "📚 الأحاديث"],
      ["⚖️ الفقه الإسلامي", "🕌 الأدعية والأذكار"],
      ["🌍 تغيير اللغة", "ℹ️ عن البوت"]
    ],
    resize_keyboard: true,
    persistent: true
  }
};

module.exports = keyboard;