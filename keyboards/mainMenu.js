const keyboard = {
  reply_markup: {
    keyboard: [
      ["📖 تفسير القرآن", "📚 الأحاديث"],
      ["⚖️ الفقه الإسلامي", "🤲 الأذكار"],
      ["🌐 تغيير اللغة", "ℹ️ عن البوت"]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

module.exports = keyboard;