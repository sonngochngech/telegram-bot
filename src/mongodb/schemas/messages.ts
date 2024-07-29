import mongoose,{Document,Schema} from "mongoose";

export interface MessagesDoc{
    chatId: number,
    author:string | undefined,
    authorId: number,
    text:string,
    messageId: number,
    date: String
}

const messagesSchema: Schema=new mongoose.Schema(
    {
        chatId: { type: Number, required: true },
        author: { type: String, required: false },
        authorId: { type: Number, required: true },
        text: { type: String, required: true },
        messageId: { type: Number, required: false ,unique: true},
        date: { type: String, required: true}
    },
    { timestamps: true },

)

export const Message=mongoose.model<MessagesDoc>('Messages', messagesSchema);