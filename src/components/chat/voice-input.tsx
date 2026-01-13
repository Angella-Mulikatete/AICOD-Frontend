'use client';

import React, { useState, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface VoiceInputProps {
    onTranscript: (text: string) => void;
}

export function VoiceInput({ onTranscript }: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);

    const toggleListening = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
            toast.error('Speech recognition is not supported in this browser.');
            return;
        }

        if (isListening) {
            setIsListening(false);
            // Logic to stop recognition would go here if we kept a reference
        } else {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                onTranscript(transcript);
                setIsListening(false);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                toast.error(`Error: ${event.error}`);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        }
    }, [isListening, onTranscript]);

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleListening}
            className={isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'}
            aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
    );
}
