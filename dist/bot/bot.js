"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const grammy_1 = require("grammy");
const commands_1 = require("./commands");
const dotenv = __importStar(require("dotenv"));
const reportMessage_1 = require("./services/reportMessage");
const conversations_1 = require("@grammyjs/conversations");
const channel_1 = require("../mongodb/operations/channel");
dotenv.config();
const BOT_TOKEN = process.env.BOT_TOKEN || '';
//BOT CONFIG
const bot = new grammy_1.Bot(BOT_TOKEN);
exports.bot = bot;
bot.api.setMyCommands(commands_1.COMMANDS);
bot.use((0, grammy_1.session)({
    initial() {
        return {};
    },
}));
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(reportMessage_1.getReports));
bot.use((0, conversations_1.createConversation)(reportMessage_1.compareReport));
// //HELP COMMAND
bot.command('start', async (ctx) => {
    const chatId = ctx.chat?.id;
    const chatTitle = ctx.chat?.title;
    await (0, channel_1.addChannel)({ chatId, chatTitle });
    ctx.reply("Rất vui được giúp bạn");
});
bot.command('mychannels', async (ctx) => {
    const channels = await (0, channel_1.getChannels)();
    if (channels.length === 0) {
        ctx.reply("Bạn chưa thêm channel vào danh sách");
    }
    else {
        const channelList = channels.map(channel => `Chat ID: ${channel.chatId}, Title: ${channel.chatTitle}`).join('\n');
        await ctx.reply(`Danh sách channels :\n${channelList}`);
    }
});
bot.command('remove_channel', async (ctx) => {
    const chatId = ctx.chat?.id;
    await (0, channel_1.removeChannel)(chatId);
    ctx.reply("Đã xóa thành công");
});
bot.command('get_report', async (ctx) => {
    await ctx.conversation.enter('getReports');
});
bot.command('compare_report', async (ctx) => {
    await ctx.conversation.enter('compareReport');
});
bot.command('help', async (ctx) => {
    await ctx.reply('Help message');
});
bot.on('message:text', async (ctx) => {
    await (0, reportMessage_1.reportMessage)(ctx);
});
bot.catch((err) => {
    console.log(err);
});
