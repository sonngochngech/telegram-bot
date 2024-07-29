import mongoose from 'mongoose';
import { MessagesDoc, Message } from '../schemas/messages';


export const addMessage = async ({
    chatId,
    author,
    authorId,
    text,
    messageId,
    date }: MessagesDoc
): Promise<MessagesDoc | null> => {
    try {
        const message= new Message({
            chatId,
            author,
            authorId,
            text,
            messageId,
            date 
        });
       const newMessage= await message.save();
       return newMessage;
    } catch (error: any) {
        console.log(error);
        return null;
    };

}

export const  getMessagesByDate = async(date:String|null|undefined,chatId: number): Promise<MessagesDoc[]>=>{
    try{
      const result=await Message.find({date,chatId}).exec();
      console.log(result);
      return result;
    }catch(error: any){
        console.log(error);
    }
    return [];
}