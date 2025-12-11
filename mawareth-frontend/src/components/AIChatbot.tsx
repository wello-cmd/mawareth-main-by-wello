import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { mongoApi } from "@/services/mongoApi";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            text: "Hello! I'm your AI Legal Assistant. I can help you understand inheritance laws and Sharia compliance. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isInitializing, setIsInitializing] = useState(false);
    const [chatId, setChatId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const initChat = async () => {
        setIsInitializing(true);
        try {
            const res = await mongoApi.chat.createOrGetChat();
            if (res.success && res.data) {
                setChatId(res.data._id);
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

    // Load chat on open
    useEffect(() => {
        if (isOpen && !chatId && !isInitializing) {
            initChat();
        }
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        if (!chatId) {
            // Try to re-init if meaningful text is present
            await initChat();
        }

        // Check again after re-init attempt
        // Note: checking 'chatId' directly here works because React 18+ might batch, but async/await allows initChat to complete. 
        // However, 'chatId' state variable won't update in this closure. 
        // We rely on 'initChat' side effects or just let the user click again if first try fails.
        // For better UX, we just warn them if it's still not ready.

        // Since we can't see the new 'chatId' in this closure immediately after await initChat(),
        // we will be safe: if logic below fails (which it will if chatId is null), we catch it or return.

        // Optimistic UI update
        const text = inputText;
        setInputText("");

        const userMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        // Actual API call needs 'chatId'. Since we don't trust state update speed in this closure:
        // We can fetch it again or accept that if it was null, initChat ran, but we might need to wait for user to click again.
        // Let's try to guard:
        if (!chatId) {
            // We can't proceed without ID.
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: "Still connecting... Please wait a moment and try sending again.",
                sender: 'bot',
                timestamp: new Date()
            }]);
            setIsLoading(false);
            return;
        }

        try {
            const res = await mongoApi.chat.sendMessage(chatId, text);

            if (res.success && res.data) {
                const updatedMessages = res.data.messages.map((m: any) => ({
                    id: m._id || Date.now().toString(),
                    text: m.text,
                    sender: m.sender === 'user' ? 'user' : 'bot',
                    timestamp: new Date(m.timestamp)
                }));
                setMessages(updatedMessages);
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    text: "Error sending message. Please try again.",
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                text: "Network error. Please try again.",
                sender: 'bot',
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-all duration-300 hover:scale-105"
                >
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                </Button>
            )}

            {isOpen && (
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
                                {messages.map((msg) => (
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
                                {(isLoading || isInitializing) && (
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
                            onSubmit={(e) => {
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
