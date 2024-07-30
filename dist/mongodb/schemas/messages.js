"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messagesSchema = new mongoose_1.default.Schema({
    chatId: { type: Number, required: true },
    author: { type: String, required: false },
    authorId: { type: Number, required: true },
    text: { type: String, required: true },
    messageId: { type: Number, required: false, unique: true },
    date: { type: String, required: true }
}, { timestamps: true });
exports.Message = mongoose_1.default.model('Messages', messagesSchema);
