function normalize(text = "") {
  return text
    .toLowerCase()
    .replace(/[إأآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim();
}

function getSmartReply(message) {

  const text = normalize(message);

  // السلام
  if (
    text.includes("السلام عليكم") ||
    text === "سلام" ||
    text === "السلام"
  ) {
    return "🌿 وعليكم السلام ورحمة الله وبركاته، أهلاً وسهلاً بك.";
  }

  // من أنت
  if (
    text.includes("من انت") ||
    text.includes("ما اسمك")
  ) {
    return `🤖 أنا نور الهداية AI.

مساعد إسلامي ذكي يساعدك في:

📖 تفسير القرآن
📚 الأحاديث النبوية
⚖️ الفقه الإسلامي
🤲 الأذكار
❓ والإجابة عن الأسئلة الإسلامية بإذن الله.`;
  }

  // من صممك
  if (
    text.includes("من صممك") ||
    text.includes("من صنعك") ||
    text.includes("من برمجك")
  ) {
    return `👨‍💻 تم تصميمي وبرمجتي بواسطة

🌟 ثامر الحجري

نسأل الله أن يجعل هذا العمل في ميزان حسناته.`;
  }

  // ماذا تستطيع
  if (
    text.includes("ماذا تستطيع") ||
    text.includes("بماذا تساعدني") ||
    text.includes("ماذا تقدم")
  ) {
    return `يمكنني مساعدتك في:

📖 تفسير القرآن الكريم
📚 البحث في الأحاديث
⚖️ الفقه الإسلامي
🕌 الفتاوى
🤲 الأذكار
🌍 والرد بعدة لغات بإذن الله.`;
  }

  // الشكر
  if (
    text.includes("شكرا") ||
    text.includes("شكراً") ||
    text.includes("جزاك الله")
  ) {
    return "🌹 وإياك، بارك الله فيك، وأسأل الله أن ينفع بك.";
  }

  return null;
}

module.exports = {
  getSmartReply
};