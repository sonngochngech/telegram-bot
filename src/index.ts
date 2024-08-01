
import { bot } from './bot';
import * as dotenv from 'dotenv';
import { connectDB } from './mongodb';
import { webhookCallback } from "grammy";
import express from "express";



dotenv.config();
const domain = String(process.env.DOMAIN);
const secretPath = String(process.env.BOT_TOKEN);
const app = express();
connectDB();

app.use(express.json());
app.use(`/${secretPath}`, webhookCallback(bot, "express"));

app.listen(Number(process.env.PORT), async () => {
  // Make sure it is `https` not `http`!
  await bot.api.setWebhook(`https://${domain}/${secretPath}`);
});

export default app;