"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChannelExist = exports.getChannels = exports.removeChannel = exports.addChannel = void 0;
const channel_1 = require("../schemas/channel");
const addChannel = async ({ chatId, chatTitle }) => {
    try {
        const oldChannel = await channel_1.Channel.findOne({ chatId }).exec();
        if (oldChannel !== null)
            return null;
        const channel = new channel_1.Channel({ chatId,
            chatTitle });
        const newChannel = await channel.save();
        return newChannel;
    }
    catch (err) {
        console.log(err);
        return null;
    }
};
exports.addChannel = addChannel;
const removeChannel = async (chatId) => {
    try {
        const channel = await channel_1.Channel.findOneAndDelete({ chatId }).exec();
        if (channel) {
            console.log(`Channel with chatId ${chatId} was deleted.`);
        }
        else {
            console.log(`Channel with chatId ${chatId} not found.`);
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.removeChannel = removeChannel;
const getChannels = async () => {
    try {
        const channel = await channel_1.Channel.find().exec();
        return channel;
    }
    catch (err) {
        console.log(err);
        return [];
    }
};
exports.getChannels = getChannels;
const checkChannelExist = async (chatId) => {
    const channel = await channel_1.Channel.find({ chatId }).exec();
    if (channel.length !== 0)
        return true;
    return false;
};
exports.checkChannelExist = checkChannelExist;
