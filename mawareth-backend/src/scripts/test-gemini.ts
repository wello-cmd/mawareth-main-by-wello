import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

dotenv.config();

const logFile = path.resolve(__dirname, '../../test-output.txt');
const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};

const runTest = async () => {
    // Clear log file
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

    log("Testing Gemini API connection...");

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        log("❌ GEMINI_API_KEY is missing in .env");
        return;
    }
    log(`API Key found (starts with: ${apiKey.substring(0, 5)}...)`);

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Briefly say 'Hello from Merath AI' in English.";
        log(`Sending prompt: "${prompt}"`);

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        log("\n✅ AI Response received:");
        log("-----------------------------------");
        log(text);
        log("-----------------------------------");
        log("Gemini integration is WORKING.");

    } catch (error: any) {
        log("\n❌ Gemini API Test FAILED:");
        log(error.message);
    }
};

runTest();
