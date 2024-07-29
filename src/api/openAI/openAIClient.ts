import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN || '';



const openai=new OpenAI({
    apiKey: OPEN_AI_TOKEN, 
});

export {openai};