'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type LearningStyle = 'Visual' | 'Auditory' | 'Kinesthetic' | 'Reading/Writing';

export interface NavigationLink {
    title: string;
    url: string;
    description?: string;
    isInternal: boolean;
}

export interface ChatMessageData {
    text: string;
    navigationLinks?: NavigationLink[];
    suggestions?: string[];
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string | ChatMessageData;
    timestamp: Date;
}

interface ChatContextType {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    learningStyle: LearningStyle | undefined;
    input: string;
    toggleChat: () => void;
    closeChat: () => void;
    openChat: () => void;
    sendMessage: (content: string) => Promise<void>;
    setInput: (value: string) => void;
    setLearningStyle: (style: LearningStyle) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [learningStyle, setLearningStyleState] = useState<LearningStyle | undefined>(undefined);

    // Load learning style from local storage
    useEffect(() => {
        const savedStyle = localStorage.getItem('aicod_learning_style') as LearningStyle;
        if (savedStyle) {
            setLearningStyleState(savedStyle);
        }
    }, []);

    // Update local storage when learning style changes
    const setLearningStyle = (style: LearningStyle) => {
        setLearningStyleState(style);
        localStorage.setItem('aicod_learning_style', style);
    };

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Welcome to AICOD! I'm your AI assistant. I can help you learn about our biodiversity, human rights, and community livelihood programs. How can I assist you today?",
                    timestamp: new Date(),
                },
            ]);
        }
    }, [messages.length]);

    const toggleChat = useCallback(() => setIsOpen((prev) => !prev), []);
    const closeChat = useCallback(() => setIsOpen(false), []);
    const openChat = useCallback(() => setIsOpen(true), []);

    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim()) return;

            const userMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: content.trim(),
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            setIsTyping(true);

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [...messages, userMessage].map((m) => ({
                            role: m.role,
                            content: typeof m.content === 'string' ? m.content : m.content.text,
                        })),
                        learningStyle: learningStyle,
                    }),
                });

                if (!response.ok) throw new Error('Failed to send message');

                const reader = response.body?.getReader();
                const decoder = new TextDecoder();
                let assistantContent = '';

                if (reader) {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value);
                        assistantContent += chunk;
                    }
                }

                // Parse UI data if present
                let parsedContent: string | ChatMessageData = assistantContent;
                const uiDataMatch = assistantContent.match(/__UI_DATA__(.+?)__UI_DATA__/);

                if (uiDataMatch) {
                    try {
                        const uiData = JSON.parse(uiDataMatch[1]);
                        const textContent = assistantContent.replace(/__UI_DATA__.+?__UI_DATA__/, '').trim();

                        parsedContent = {
                            text: textContent || uiData.text,
                            navigationLinks: uiData.navigationLinks,
                            suggestions: uiData.suggestions,
                        };
                    } catch (error) {
                        console.error('Error parsing UI data:', error);
                        parsedContent = assistantContent.replace(/__UI_DATA__.+?__UI_DATA__/, '').trim();
                    }
                }

                const assistantMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: parsedContent,
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, assistantMessage]);
            } catch (error) {
                console.error('Error sending message:', error);
                const errorMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                    timestamp: new Date(),
                };
                setMessages((prev) => [...prev, errorMessage]);
            } finally {
                setIsTyping(false);
            }
        },
        [messages, learningStyle]
    );

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                messages,
                isTyping,
                learningStyle,
                input,
                toggleChat,
                closeChat,
                openChat,
                sendMessage,
                setInput,
                setLearningStyle,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
