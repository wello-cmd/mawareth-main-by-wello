/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENROUTER_KEY: string;
    readonly VITE_MONGODB_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
