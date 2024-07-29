import { createCompletion } from "../../api/bot/createCompletion";
import { coms } from "../../constants";
import { addMessage, getMessagesByDate } from "../../mongodb/operations/message";
import { BotContext, ConverstaionContext } from "../types";
import { MessagesDoc } from '../../mongodb/schemas/messages';
import { ComsType, dateRegex } from '../../constants/openAI';
import { checkChannelExist } from "../../mongodb/operations/channel";


const reportMessage = async (ctx: BotContext) => {
    const text: string | undefined = ctx.message?.text;
    if (text && text.includes("BÁO CÁO")) {
        const match = text.match(dateRegex);
        const date: string | null = match ? match[0] : null;
        const { user } = await ctx.getAuthor();
        const chatId = ctx.chat?.id;
        const messageId = ctx.msgId;
        const author = user.username;
        const authorId = user.id;
        if (chatId && messageId && text && authorId && text && date) {
            const message: MessagesDoc = {
                chatId,
                author,
                authorId,
                text,
                messageId,
                date
            }
            await addMessage(message);
        }
    }
    return;
}
const getReports = async (conversations: ConverstaionContext, ctx: BotContext) => {
    await ctx.reply("Nhập chat Id");
    let message0 = await conversations.wait();
    const chatId: number = parseInt(message0?.message?.text || '', 10);
    if (isNaN(chatId) || !(await checkChannelExist(chatId))) {
        await ctx.reply("Chat Id không đúng.Hãy kiểm tra lại");
        return;
    }
    do {
        const dateList: string[] = [];
        await ctx.reply("Nhập ngày hoặc /cancel để exit");
        await ctx.reply("ngày: ");
        let { message } = await conversations.wait();
        if (isCancel(message?.text)) {
            await ctx.reply("Leaving ...");
            return;
        }
        if (message?.text) {
            dateList.push(message.text);
            const modelAnswer = await getModelReport(dateList, "get_report_detail", chatId);
            if (modelAnswer.length !== 0) {
                await ctx.reply(modelAnswer[0]);
            } else {
                await ctx.reply(`Không có dữ liệu báo cáo ngày ${message.text}`);
            }
        } else {
            await ctx.reply("Đã xảy ra lỗi khi nhận ngày. Vui lòng thử lại.");
        }

    } while (true);

};

const compareReport = async (conversations: ConverstaionContext, ctx: BotContext) => {
    await ctx.reply("Nhập chat Id");
    let message0 = await conversations.wait();
    const chatId: number = parseInt(message0?.message?.text || '', 10);
    if (isNaN(chatId) || !(await checkChannelExist(chatId))) {
        await ctx.reply("Chat Id không đúng.Hãy kiểm tra lại");
        return;
    }
    do {
        await ctx.reply("Nhập ngày hoặc /cancel để thoát")
        const dateList: string[] = [];
        await ctx.reply("ngày 1 và ngày 2(ví dụ 23/07 22/07) :  ");
        let {message} = await conversations.wait();
        const textMessage = message?.text;
        if (isCancel(textMessage)) {
            await ctx.reply("Cảm ơn");
            return;
        }

        let dates: string[] | null = message?.text ? message.text.split(' ') : null;
        if(!dates || dates.length!==2){
            await ctx.reply('Vui lòng nhập lại theo mẫu (22/07 23/07)');
            continue;
        }
        const [date1,date2]=dates;
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
            const modelAnswer: string[] = await getModelReport(dateList, "get_overview_report", chatId);
            const finalString = modelAnswer.map((text, index) => `Báo Cáo ngày ${dateList[index]}:\n${text}`).join('\n');
            const requirement = `${finalString}\n\n${coms["compare"]}`;
            const answer = await createCompletion(requirement);
            await ctx.reply(answer);
        }
    } while (true)

}

const getModelReport = async (dateList: string[], type: ComsType, chatId: number): Promise<string[]> => {
    const formattedStringList: String[] = await Promise.all(
        dateList.map(async (date) => {
            const reports: MessagesDoc[] = await getMessagesByDate(date, chatId);
            const reports_text: string[] = reports.map((res) => res.text);
            const formattedString: string = reports_text.map((text, index) => `${index + 1}.\n${text}`).join('\n\n');
            return formattedString;
        })
    );
    if (formattedStringList[0] === '') return [];


    const modelAnswer: string[] = await Promise.all(
        formattedStringList.map(async (text) => {
            const requirement = `${text}\n${coms[type]}`;
            return await createCompletion(requirement);

        })
    )
    return modelAnswer;

}

const checkDate = async (date: string | null | undefined, chatId: number): Promise<boolean> => {
    const record: MessagesDoc[] = await getMessagesByDate(date, chatId);
    if (record.length !== 0) return true;
    return false;

}



export const isCancel = (messsage: string | null | undefined) => {
    if (messsage === '/cancel') {
        return true;
    }
    return false;
}

export { reportMessage, getReports, compareReport }