import mongoose,{Document,Schema} from "mongoose";

export interface ChannelDoc extends Document{
    chatId: number,
    chatTitle: string| undefined,
}

const channelSchema: Schema=new mongoose.Schema(
    {
        chatId: { type: Number, required: true },
        chatTitle: {type: String,required: false}
    },
    { timestamps: true },

)

export const Channel=mongoose.model<ChannelDoc>('Channels', channelSchema);