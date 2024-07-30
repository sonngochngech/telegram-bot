"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompletion = void 0;
const openAI_1 = require("../openAI");
const constants_1 = require("../../constants");
const modelName = "gpt-4o";
const createCompletion = async (prompt) => {
    try {
        const response = await openAI_1.openai.chat.completions.create({
            model: modelName,
            messages: [{ role: 'user', content: prompt }],
            temperature: constants_1.TEMERATURE,
            // max_tokens: MAX_TOKENS,
            // top_p: TOP_P,
            // frequency_penalty: FREQUENCY_PENALTY,
            // presence_penalty: PRESENCE_PENALTY,
        });
        return response.choices[0].message.content;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.createCompletion = createCompletion;
