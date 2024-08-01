"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const dotenv = __importStar(require("dotenv"));
const mongodb_1 = require("./mongodb");
const grammy_1 = require("grammy");
const express_1 = __importDefault(require("express"));
dotenv.config();
const domain = String(process.env.DOMAIN);
const secretPath = String(process.env.BOT_TOKEN);
const app = (0, express_1.default)();
(0, mongodb_1.connectDB)();
app.use(express_1.default.json());
app.use(`/${secretPath}`, (0, grammy_1.webhookCallback)(bot_1.bot, "express"));
app.listen(Number(process.env.PORT), async () => {
    // Make sure it is `https` not `http`!
    await bot_1.bot.api.setWebhook(`https://${domain}/${secretPath}`);
});
exports.default = app;
