'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@/contexts/chat-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, Settings, BotMessageSquare } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChatMessageRenderer } from './chat-message-renderer';
import { LearningProfileSettings } from './learning-profile-settings';
import { VoiceInput } from './voice-input';

export function AICODChatbot() {
    const { isOpen, messages, isTyping, toggleChat, sendMessage, closeChat, input, setInput } = useChat();
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Auto-scroll to bottom using scrollIntoView
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    // Focus input when opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;
        await sendMessage(input);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <Button
                onClick={toggleChat}
                className={cn(
                    "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                    isOpen ? "bg-red-500 hover:bg-red-600" : "bg-brand-orange hover:bg-brand-orange/90"
                )}
                aria-label={isOpen ? "Close assistant" : "Open assistant"}
            >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <BotMessageSquare className="h-6 w-6 text-white" />}
            </Button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 flex flex-col bg-white border border-gray-200 rounded-2xl shadow-2xl w-[380px] h-[600px] max-h-[75vh] transition-all duration-300 animate-in slide-in-from-bottom-5 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-orange to-orange-600 text-white flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center p-1.5">
                                <Image
                                    src="/assets/AICOD F.jpg"
                                    alt="AICOD"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm leading-tight">AICOD Assistant</h3>
                                <p className="text-[10px] text-white/80">Empowering Communities</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSettingsOpen(true)}
                            className="h-8 w-8 text-white hover:bg-white/20"
                            aria-label="Settings"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto bg-gray-50/30 min-h-0 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <div className="p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
                                        message.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                                            message.role === "user"
                                                ? "bg-brand-orange text-white rounded-tr-none"
                                                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none font-medium"
                                        )}
                                    >
                                        <ChatMessageRenderer content={message.content} />
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start animate-in fade-in duration-300">
                                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-sm shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="h-1.5 w-1.5 bg-brand-orange/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="h-1.5 w-1.5 bg-brand-orange/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="h-1.5 w-1.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} className="h-1" />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-white flex-shrink-0">
                        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                            <VoiceInput
                                onTranscript={(text) => setInput(input + (input ? " " : "") + text)}
                            />
                            <Input
                                ref={inputRef}
                                type="text"
                                placeholder="How can I help you today?"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="flex-1 rounded-full bg-gray-100 border-none px-4 h-10 text-sm focus-visible:ring-brand-orange/30"
                                disabled={isTyping}
                            />
                            <Button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="h-10 w-10 rounded-full bg-brand-orange hover:bg-brand-orange/90 flex-shrink-0"
                                size="icon"
                                aria-label="Send"
                            >
                                <Send className="h-4 w-4 text-white" />
                            </Button>
                        </form>
                        <p className="text-[10px] text-gray-400 mt-3 text-center">
                            AI-powered assistant for AICOD Community Development
                        </p>
                    </div>
                </div>
            )}

            <LearningProfileSettings open={settingsOpen} onOpenChange={setSettingsOpen} />
        </>
    );
}
