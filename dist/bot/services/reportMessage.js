"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareReport = exports.getReports = exports.reportMessage = exports.isCancel = void 0;
const createCompletion_1 = require("../../api/bot/createCompletion");
const constants_1 = require("../../constants");
const message_1 = require("../../mongodb/operations/message");
const openAI_1 = require("../../constants/openAI");
const channel_1 = require("../../mongodb/operations/channel");
const reportMessage = async (ctx) => {
    const text = ctx.message?.text;
    if (text && text.includes("BÁO CÁO")) {
        const match = text.match(openAI_1.dateRegex);
        const date = match ? match[0] : null;
        const { user } = await ctx.getAuthor();
        const chatId = ctx.chat?.id;
        const messageId = ctx.msgId;
        const author = user.username;
        const authorId = user.id;
        if (chatId && messageId && text && authorId && text && date) {
            const message = {
                chatId,
                author,
                authorId,
                text,
                messageId,
                date
            };
            await (0, message_1.addMessage)(message);
        }
    }
    return;
};
exports.reportMessage = reportMessage;
const getReports = async (conversations, ctx) => {
    await ctx.reply("Nhập chat Id");
    let message0 = await conversations.wait();
    const chatId = parseInt(message0?.message?.text || '', 10);
    if (isNaN(chatId) || !(await (0, channel_1.checkChannelExist)(chatId))) {
        await ctx.reply("Chat Id không đúng.Hãy kiểm tra lại");
        return;
    }
    do {
        const dateList = [];
        await ctx.reply("Nhập ngày hoặc cancel để exit");
        await ctx.reply("ngày: ");
        let { message } = await conversations.wait();
        if ((0, exports.isCancel)(message?.text)) {
            await ctx.reply("Leaving ...");
            return;
        }
        if (message?.text) {
            dateList.push(message.text);
            const modelAnswer = await getModelReport(dateList, "get_report_detail", chatId);
            if (modelAnswer.length !== 0) {
                await ctx.reply(modelAnswer[0]);
            }
            else {
                await ctx.reply(`Không có dữ liệu báo cáo ngày ${message.text}`);
            }
        }
        else {
            await ctx.reply("Đã xảy ra lỗi khi nhận ngày. Vui lòng thử lại.");
        }
    } while (true);
};
exports.getReports = getReports;
const compareReport = async (conversations, ctx) => {
    await ctx.reply("Nhập chat Id");
    let message0 = await conversations.wait();
    const chatId = parseInt(message0?.message?.text || '', 10);
    if (isNaN(chatId) || !(await (0, channel_1.checkChannelExist)(chatId))) {
        await ctx.reply("Chat Id không đúng.Hãy kiểm tra lại");
        return;
    }
    do {
        await ctx.reply("Nhập ngày hoặc cancel để thoát");
        const dateList = [];
        await ctx.reply("ngày 1 và ngày 2(ví dụ 23/07 22/07) :  ");
        let { message } = await conversations.wait();
        const textMessage = message?.text;
        if ((0, exports.isCancel)(textMessage)) {
            await ctx.reply("Cảm ơn");
            return;
        }
        let dates = message?.text ? message.text.split(' ') : null;
        if (!dates || dates.length !== 2) {
            await ctx.reply('Vui lòng nhập lại theo mẫu (22/07 23/07)');
            continue;
        }
        const [date1, date2] = dates;
        if (!(await checkDate(date1, chatId))) {
            await ctx.reply(`Không có báo cáo về ngày ${date1}`);
            continue;
        }
        if (!(await checkDate(date2, chatId))) {
            await ctx.reply(`Không có báo cáo về ngày ${date2}`);
            continue;
        }
        if (date1 && date2) {
            dateList.push(date1, date2);
            const modelAnswer = await getModelReport(dateList, "get_overview_report", chatId);
            const finalString = modelAnswer.map((text, index) => `Báo Cáo ngày ${dateList[index]}:\n${text}`).join('\n');
            const requirement = `${finalString}\n\n${constants_1.coms["compare"]}`;
            const answer = await (0, createCompletion_1.createCompletion)(requirement);
            await ctx.reply(answer);
        }
    } while (true);
};
exports.compareReport = compareReport;
const getModelReport = async (dateList, type, chatId) => {
    const formattedStringList = await Promise.all(dateList.map(async (date) => {
        const reports = await (0, message_1.getMessagesByDate)(date, chatId);
        const reports_text = reports.map((res) => res.text);
        const formattedString = reports_text.map((text, index) => `${index + 1}.\n${text}`).join('\n\n');
        return formattedString;
    }));
    if (formattedStringList[0] === '')
        return [];
    const modelAnswer = await Promise.all(formattedStringList.map(async (text) => {
        const requirement = `${text}\n${constants_1.coms[type]}`;
        return await (0, createCompletion_1.createCompletion)(requirement);
    }));
    return modelAnswer;
};
const checkDate = async (date, chatId) => {
    const record = await (0, message_1.getMessagesByDate)(date, chatId);
    if (record.length !== 0)
        return true;
    return false;
};
const isCancel = (messsage) => {
    if (messsage === 'cancel') {
        return true;
    }
    return false;
};
exports.isCancel = isCancel;
