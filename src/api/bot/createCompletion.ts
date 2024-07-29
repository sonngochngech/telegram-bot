
import { openai } from '../openAI';

import { ChatCompletion } from 'openai/resources';
import {
    FREQUENCY_PENALTY,
    MAX_TOKENS,
    PRESENCE_PENALTY,
    TEMERATURE,
    TOP_P,
} from '../../constants';



const modelName="gpt-4o";
export const createCompletion=async(prompt:string):Promise<any>=> {

    try {
        const response : ChatCompletion = await openai.chat.completions.create({
            model: modelName,
            messages:[{ role: 'user', content: prompt }] ,
            temperature: TEMERATURE,
            // max_tokens: MAX_TOKENS,
            // top_p: TOP_P,
            // frequency_penalty: FREQUENCY_PENALTY,
            // presence_penalty: PRESENCE_PENALTY,
        });
        return response.choices[0].message.content;
    } catch (error: any) {
        console.log(error);
        return null;
    }
};
