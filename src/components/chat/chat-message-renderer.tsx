'use client';

import React from 'react';
import type { ChatMessageData } from '@/contexts/chat-context';
import { ExternalLink, Navigation } from 'lucide-react';
import Link from 'next/link';

interface ChatMessageRendererProps {
    content: string | ChatMessageData;
}

export function ChatMessageRenderer({ content }: ChatMessageRendererProps) {
    if (typeof content === 'string') {
        return <div className="whitespace-pre-wrap">{content}</div>;
    }

    return (
        <div className="space-y-3">
            <div className="whitespace-pre-wrap">{content.text}</div>

            {content.navigationLinks && content.navigationLinks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {content.navigationLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.url}
                            className="flex items-center gap-2 rounded-full border border-brand-orange bg-white px-3 py-1.5 text-xs font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                        >
                            <Navigation className="h-3 w-3" />
                            {link.title}
                            {!link.isInternal && <ExternalLink className="h-3 w-3" />}
                        </Link>
                    ))}
                </div>
            )}

            {content.suggestions && content.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {content.suggestions.map((suggestion, idx) => (
                        <button
                            key={idx}
                            className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
