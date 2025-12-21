/// <reference types="vite/client" />
import React, { useState, useRef, useEffect } from 'react'; // Import React hooks
import { Button } from "@/components/ui/button"; // Import UI components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2, RefreshCw } from "lucide-react"; // Import icons
import { cn } from "@/lib/utils"; // Import utility for class merging
import { mongoApi } from "@/services/mongoApi"; // Import API service

// Message interface
interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// AI Chatbot Component
export const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // State for chat window visibility
    const [messages, setMessages] = useState<Message[]>([ // Initial message state
        {
            id: 'welcome',
            text: "Hello! I'm your AI Legal Assistant. I can help you understand inheritance laws and Sharia compliance. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState(""); // Input field state
    const [isLoading, setIsLoading] = useState(false); // Loading state for AI response
    const [isInitializing, setIsInitializing] = useState(false); // Initialization state
    const [chatId, setChatId] = useState<string | null>(null); // Chat session ID
    const scrollRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling

    // Initialize or retrieve existing chat session
    const initChat = async () => {
        setIsInitializing(true);
        try {
            const res = await mongoApi.chat.createOrGetChat();
            if (res.success && res.data) {
                setChatId(res.data._id);
                // Restore chat history if exists
                if (res.data.messages && res.data.messages.length > 0) {
                    const history = res.data.messages.map((m: any) => ({
                        id: m._id || Date.now().toString(),
                        text: m.text,
                        sender: m.sender === 'user' ? 'user' : 'bot',
                        timestamp: new Date(m.timestamp)
                    }));
                    setMessages(history);
                }
            } else {
                console.error("Failed to create/get chat:", res.error);
            }
        } catch (err) {
            console.error("Failed to init chat", err);
        } finally {
            setIsInitializing(false);
        }
    };

    // Initialize chat when opened
    useEffect(() => {
        if (isOpen && !chatId && !isInitializing) {
            initChat();
        }
    }, [isOpen]);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    // Handle sending a message
    const handleSendMessage = async () => {
        // Check for empty input
        if (!inputText.trim()) return;

        // Optimistic UI update
        const text = inputText;
        setInputText("");

        const userMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]); // Add user message immediately
        setIsLoading(true); // Start loading

        try {
            console.log("Sending request to OpenRouter...");
            // Call OpenRouter API directly
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`, // Use API key from env
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173", // Required by OpenRouter for free models
                    "X-Title": "Merath AI Legal Assistant"
                },
                body: JSON.stringify({
                    "model": "google/gemini-2.0-flash-exp:free", // Specify model
                    "messages": [
                        {
                            "role": "system",
                            "content": `You are 'Merath AI' (مساعد ميراث الذكي), a specialized legal and financial assistant for the 'Merath' platform in Egypt.

YOUR IDENTITY:
- You are an expert in Egyptian Inheritance Law (Law No. 77 of 1943) and Islamic Sharia (Sunni/Shafi'i & Hanafi schools as applied in Egypt).
- You are professional, empathetic, and reassuring. Inheritance is stressful; you bring calm clarity.
- You speak both English and Egyptian Arabic (Modern Standard Arabic mixed with professional Egyptian terms).

YOUR CRITICAL RULES (DO NOT BREAK):
1. NO MATH: You must NEVER calculate inheritance shares yourself. If a user asks "How much does my wife get from 2 million?", you must REFUSE to answer with a number.
   - Instead, say: "For precise legal calculations, please use the 'Inheritance Calculator' tool on your dashboard. It is certified by our Sharia Audit Board."
   - (Reason: AI math can be wrong. We want them to use your App Feature.)

2. THE "SOLH" REDIRECT: If a user mentions "selling", "dispute", "family won't sell", or "blocked assets":
   - Advise them to list their share on the 'Solh Marketplace' (سوق الصلح).
   - Explain that Merath allows them to sell *just their share* to investors without needing family consent.

3. THE "FINANCE" REDIRECT: If a user asks about "loans", "borrowing", or "buying out a sibling":
   - Explain 'Merath Murabaha' (مرابحة ميراث).
   - Emphasize it is 100% Sharia-Compliant (Halal) and asset-backed, unlike traditional bank usury (Riba).

4. SAFETY & LIABILITY:
   - Do not give advice on circumventing the law (e.g., "How do I hide assets?"). Refuse these requests firmly.
   - Always add a disclaimer in complex cases: "This is for guidance. Please consult a specialized lawyer for final court proceedings."

5. TONE & STYLE:
   - Keep answers under 3-4 sentences unless asked for a detailed explanation.
   - Use formatting (bullet points) for readability.
   - If the user speaks Arabic, reply in Arabic. If English, reply in English.`
                        },
                        ...messages.map(m => ({ // Include chat history context
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        })),
                        {
                            role: "user",
                            content: text
                        }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                const botReply = data.choices[0]?.message?.content || "I apologize, but I couldn't generate a response."; // Get AI response

                const botMessage: Message = {
                    id: Date.now().toString(),
                    text: botReply,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMessage]); // Display AI response
            } else {
                console.error("OpenRouter API Error Status:", response.status, response.statusText);
                let errorDetails = "Unknown error";
                try {
                    const errorData = await response.json();
                    console.error("OpenRouter Error Details:", JSON.stringify(errorData, null, 2));
                    errorDetails = errorData.error?.message || response.statusText;
                } catch (e) {
                    errorDetails = response.statusText;
                }

                setMessages(prev => [...prev, { // Show error message to user
                    id: Date.now().toString(),
                    text: `Error (${response.status}): ${errorDetails}. Please try again.`,
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setMessages(prev => [...prev, { // Show network error message
                id: Date.now().toString(),
                text: "Network error. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && ( // Show chat bubble button if closed
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                </Button>
            )}

            {isOpen && ( // Show chat window if open
                <Card className="w-[380px] h-[600px] flex flex-col shadow-2xl border-primary/20 animate-in fade-in slide-in-from-bottom-10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 bg-primary/5 border-b">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-full">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold text-primary">AI Legal Assistant</CardTitle>
                                <p className="text-xs text-muted-foreground">Sharia-compliant inheritance guide</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {!chatId && !isInitializing && (
                                <Button variant="ghost" size="icon" onClick={initChat} title="Retry Connection" className="h-8 w-8 rounded-full">
                                    <RefreshCw className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            )}
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden bg-background/50 backdrop-blur-sm">
                        <ScrollArea className="h-full p-4">
                            <div className="space-y-4">
                                {messages.map((msg) => ( // Render messages
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-full",
                                            msg.sender === 'user' ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex gap-2 max-w-[80%]",
                                            msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}>
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                msg.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            )}>
                                                {msg.sender === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                            </div>
                                            <div className={cn(
                                                "p-3 rounded-2xl text-sm shadow-sm",
                                                msg.sender === 'user'
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-card border rounded-tl-none"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {(isLoading || isInitializing) && ( // Show loading indicator
                                    <div className="flex w-full justify-start">
                                        <div className="flex gap-2 max-w-[80%]">
                                            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div className="p-3 rounded-2xl bg-card border rounded-tl-none shadow-sm flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                                                <span className="text-xs text-muted-foreground">
                                                    {isInitializing ? "Connecting..." : "AI is thinking..."}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 bg-background border-t">
                        <form
                            onSubmit={(e: React.FormEvent) => {
                                e.preventDefault();
                                handleSendMessage();
                            }}
                            className="flex w-full gap-2"
                        >
                            <Input
                                placeholder={isInitializing ? "Connecting..." : "Ask about inheritance laws..."}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                disabled={isInitializing}
                                className="flex-1 bg-muted/50 focus-visible:ring-primary"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || isInitializing || !inputText.trim()}
                                className="shrink-0 transition-transform active:scale-95"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};
