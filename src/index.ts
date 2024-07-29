
import { runBot } from './bot';
import * as dotenv from 'dotenv';
import { connectDB } from './mongodb';


dotenv.config();


const runApp = async () => {
    try {
        await connectDB()
            .then(() => {
                runBot();
            })
            .catch((err:any) => {
              console.log(err);
            }
            )
    } catch (error: any) {
        console.log(error);
    }
};

runApp();
