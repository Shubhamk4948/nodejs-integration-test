
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { db } from "../config/db.js";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the Notification Bot!");
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, "Commands: /start /help /status");
});

bot.onText(/\/status/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot is running fine ✅");
});

export async function sendTelegramMessage(userId, message) {
  await bot.sendMessage(userId, message);
  await db("messages").insert({ userId, message, sent_at: new Date() });
}

