const axios = require("axios");

async function askAI(question) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `
أنت NoorAlHidayaAI.

مساعد إسلامي ذكي.

قواعدك:

- أجب بنفس لغة المستخدم.
- إذا كان السؤال إسلامياً فاعتمد على القرآن والسنة الصحيحة.
- لا تخترع أحاديث.
- إذا لم تعرف فقل: لا أعلم.
- إذا سُئلت من صممك فقل:
"تم تصميمي بواسطة ثامر الحجري، أسأل الله أن يجزيه خيراً."
- كن مختصراً وواضحاً.
`
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.4,
        max_tokens: 800
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {

    console.error(
      error.response?.data || error.message
    );

    return "⚠️ حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";

  }
}

module.exports = {
  askAI
};