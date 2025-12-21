import dotenv from 'dotenv';
import OpenAI from "openai";
import fs from 'fs';
import path from 'path';

dotenv.config();

const logFile = path.resolve(__dirname, '../../test-openrouter-output.txt');
const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
};

const runTest = async () => {
    // Clear log file
    if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

    log("Testing OpenRouter API connection...");

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        log("❌ OPENROUTER_API_KEY is missing in .env");
        return;
    }
    log(`API Key found (starts with: ${apiKey.substring(0, 5)}...)`);

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://openrouter.ai/api/v1",
        });

        const prompt = "Briefly say 'Hello from Merath AI via OpenRouter' in English. Do not include math.";
        log(`Sending prompt: "${prompt}"`);

        const completion = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages: [
                { role: "user", content: prompt }
            ],
        });

        const text = completion.choices[0].message.content;

        log("\n✅ AI Response received:");
        log("-----------------------------------");
        log(text || "No content returned");
        log("-----------------------------------");
        log("OpenRouter integration is WORKING.");

    } catch (error: any) {
        log("\n❌ OpenRouter API Test FAILED:");
        log(error.message);
        if (error.response) {
            log(JSON.stringify(error.response.data, null, 2));
        }
    }
};

runTest();
