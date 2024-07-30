"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBot = void 0;
const runner_1 = require("@grammyjs/runner");
const bot_1 = require("./bot");
const runBot = () => {
    if (!bot_1.bot.isInited()) {
        console.log('BOT NOT INITIATED');
        (0, runner_1.run)(bot_1.bot);
    }
};
exports.runBot = runBot;
