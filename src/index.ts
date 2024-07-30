
import { runBot } from './bot';
import * as dotenv from 'dotenv';
import { connectDB } from './mongodb';
import express, { Express, Request, Response } from "express";


dotenv.config();

const app=express();
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

app.listen(port, () => {
console.log(`[server]: Server is running at port ${port}`);
});


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

