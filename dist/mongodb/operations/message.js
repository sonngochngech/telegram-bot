"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesByDate = exports.addMessage = void 0;
const messages_1 = require("../schemas/messages");
const addMessage = async ({ chatId, author, authorId, text, messageId, date }) => {
    try {
        const message = new messages_1.Message({
            chatId,
            author,
            authorId,
            text,
            messageId,
            date
        });
        const newMessage = await message.save();
        return newMessage;
    }
    catch (error) {
        console.log(error);
        return null;
    }
    ;
};
exports.addMessage = addMessage;
const getMessagesByDate = async (date, chatId) => {
    try {
        const result = await messages_1.Message.find({ date, chatId }).exec();
        console.log(result);
        return result;
    }
    catch (error) {
        console.log(error);
    }
    return [];
};
exports.getMessagesByDate = getMessagesByDate;
