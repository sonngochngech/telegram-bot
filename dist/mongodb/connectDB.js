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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// import { LOGGER } from '../logger';
dotenv.config();
const DB = process.env.MONGO_DB || 'mongodb://';
const USER = process.env.MONGO_DB_USER || '';
const PASSWORD = encodeURIComponent(process.env.MONGO_DB_PASSWORD || '');
const DB_NAME = process.env.MONGO_DB_NAME || '';
const HOST = process.env.MONGO_DB_HOST || 'localhost';
const dbUrl = `${DB}${USER}:${PASSWORD}@${HOST}/${DB_NAME}`;
const connectDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', false);
        const mongoDbConnection = await mongoose_1.default.connect(dbUrl, {
            retryReads: true,
            retryWrites: true,
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDB = connectDB;
