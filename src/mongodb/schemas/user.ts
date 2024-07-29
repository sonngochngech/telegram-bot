import mongoose,{Document,Schema} from "mongoose";


export interface UserDoc extends Document{
    telegramUserName: string;
    telegramId: number;
}


export const userSchema= new mongoose.Schema(
    {
        telegramUserName: { type: String, required: false },
        telegramId: { type: Number, unique: true, required: false },
    },
    {
        timestamps: true,
    }
)

export const User=mongoose.model<UserDoc>('User',userSchema);
