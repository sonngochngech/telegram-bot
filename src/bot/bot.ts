import { Bot, session } from 'grammy';
import type { ParseModeFlavor } from '@grammyjs/parse-mode';
import { BotContext } from './types';
import { COMMANDS } from './commands';
import * as dotenv from 'dotenv';

import { compareReport, getReports, reportMessage } from './services/reportMessage';
import { conversations, createConversation } from '@grammyjs/conversations';
import { addChannel, getChannels, removeChannel } from '../mongodb/operations/channel';
import { ChannelDoc } from '../mongodb/schemas/channel';


dotenv.config();


const BOT_TOKEN = process.env.BOT_TOKEN || '';


//BOT CONFIG
const bot = new Bot<ParseModeFlavor<BotContext>>(BOT_TOKEN);

bot.api.setMyCommands(COMMANDS);


bot.use(
  session({
      initial() {
          return {};
      },
  })
);
bot.use(conversations());
bot.use(createConversation(getReports));
bot.use(createConversation(compareReport));





// //HELP COMMAND

bot.command('start',async(ctx)=>{
     const chatId=ctx.chat?.id;
     const chatTitle=ctx.chat?.title;
     await addChannel({chatId,chatTitle});
     ctx.reply("Rất vui được giúp bạn");
})

bot.command('mychannels',async(ctx)=>{
  const channels: ChannelDoc[]=await getChannels();
  if(channels.length===0){
      ctx.reply("Bạn chưa thêm channel vào danh sách");
  }else{
    const channelList = channels.map(channel => 
      `Chat ID: ${channel.chatId}, Title: ${channel.chatTitle}`
  ).join('\n');
   await ctx.reply(`Danh sách channels :\n${channelList}`);
  }
})

bot.command('remove_channel',async(ctx)=>{
    const chatId=ctx.chat?.id;
    await removeChannel(chatId);
    ctx.reply("Đã xóa thành công");
})

bot.command('get_report', async (ctx) => {
  await ctx.conversation.enter('getReports');
});
bot.command('compare_report',async(ctx)=>{
  await ctx.conversation.enter('compareReport');
})

bot.command('help',async(ctx) => {
  await  ctx.reply('Help message');
});

bot.on('message:text',async (ctx)=>{
  await reportMessage(ctx);
})

bot.catch((err)=>{
  console.log(err);
})

export {bot}