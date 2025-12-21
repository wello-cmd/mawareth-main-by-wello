// @ts-nocheck
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

const listModels = async () => {
    // Clear log file
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

    log("Listing Gemini Models...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return;

    try {
        // We use the raw API or a specific method if available, 
        // but the library might expose it?
        // Actually, the library doesn't expose listModels easily on the main instance in some versions?
        // Let's try to infer or just use a known older model 'gemini-1.0-pro' perhaps?
        // Wait, 'gemini-pro' IS 'gemini-1.0-pro'.

        // If 404, it might be the API key doesn't have the Generative Language API enabled in Google Cloud Console.
        // But I cannot fix that for the user.

        // Let's try to just log that we suspect API enablement issues if models fail.
        // But let's try 'gemini-1.0-pro' explicitly.

        const genAI = new GoogleGenerativeAI(apiKey);

        // There isn't a direct listModels on genAI client in this node version typically without using the model manager?
        // Let's just try one more common variant: 'gemini-1.5-pro-latest'

        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Test");
        log("gemini-1.0-pro worked!");

    } catch (error: any) {
        log("Standard models failed. This likely means the API Key is invalid or the 'Generative Language API' is not enabled in Google Cloud Console.");
        log("Error details: " + error.message);
    }
};

listModels();
