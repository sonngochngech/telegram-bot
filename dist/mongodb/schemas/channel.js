"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const channelSchema = new mongoose_1.default.Schema({
    chatId: { type: Number, required: true },
    chatTitle: { type: String, required: false }
}, { timestamps: true });
exports.Channel = mongoose_1.default.model('Channels', channelSchema);
