import mongoose from 'mongoose';
import { Channel, ChannelDoc } from '../schemas/channel';
import { channel } from 'diagnostics_channel';



export const addChannel= async({
    chatId,
    chatTitle
}: Pick<ChannelDoc,
'chatId'|'chatTitle'>): Promise<ChannelDoc | null>=> {
  try{

    const oldChannel: ChannelDoc | null=await Channel.findOne({chatId}).exec();
    if(oldChannel!==null) return null ;
    const channel=new Channel(
      {chatId,
      chatTitle});
    const newChannel=  await channel.save();
    return newChannel;
  }catch(err:any){
    console.log(err);
    return null;
  }    
}

export const removeChannel=async(chatId: number|null): Promise<void>=>{
    try{
       const channel: ChannelDoc | null= await Channel.findOneAndDelete({chatId}).exec();
       if (channel) {
        console.log(`Channel with chatId ${chatId} was deleted.`);
        } else {
            console.log(`Channel with chatId ${chatId} not found.`);
        }
    }catch(err:any){
        console.log(err);
    }
    
}

export const getChannels=async(): Promise<ChannelDoc[]>=>{
    try{
      const channel: ChannelDoc[]= await Channel.find().exec();
       return channel;
  }catch(err:any){
      console.log(err);
      return [];
  }

}

export const checkChannelExist = async (chatId: number): Promise<boolean> => {
  const channel: ChannelDoc[]= await Channel.find({chatId}).exec();
  if(channel.length!==0) return true;
  return false;
};
