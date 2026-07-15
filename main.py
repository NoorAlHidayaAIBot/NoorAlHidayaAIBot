from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import os
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")

app = Application.builder().token(TOKEN).build()

# أمر /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [["📖 القرآن", "📚 الحديث"], ["🤲 الأذكار", "🕌 الصلاة"]]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text("مرحبًا بك في NoorAlHidayaAI 🌟", reply_markup=reply_markup)

app.add_handler(CommandHandler("start", start))

print("NoorAlHidayaAI Bot is running...")
app.run_polling()