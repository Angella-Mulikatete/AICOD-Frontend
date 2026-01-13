'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { useChat, type LearningStyle } from '@/contexts/chat-context';
import { Check, BookOpen, Eye, Headphones, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LearningProfileSettingsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const styles: { id: LearningStyle; label: string; icon: any; description: string }[] = [
    {
        id: 'Visual',
        label: 'Visual',
        icon: Eye,
        description: 'Prefers diagrams, charts, and visual demonstrations.'
    },
    {
        id: 'Auditory',
        label: 'Auditory',
        icon: Headphones,
        description: 'Prefers listening, storytelling, and discussion.'
    },
    {
        id: 'Kinesthetic',
        label: 'Kinesthetic',
        icon: Activity,
        description: 'Prefers hands-on practice, action, and practical examples.'
    },
    {
        id: 'Reading/Writing',
        label: 'Reading/Writing',
        icon: BookOpen,
        description: 'Prefers text, documentation, and detailed explanations.'
    }
];

export function LearningProfileSettings({ open, onOpenChange }: LearningProfileSettingsProps) {
    const { learningStyle, setLearningStyle } = useChat();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Learning Style Preference</DialogTitle>
                    <DialogDescription>
                        Help me adapt my communication to best suit your preferences.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {styles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => {
                                setLearningStyle(style.id);
                                onOpenChange(false);
                            }}
                            className={cn(
                                "flex items-center gap-4 rounded-lg border p-3 text-left transition-all hover:bg-accent",
                                learningStyle === style.id ? "border-brand-orange bg-brand-orange/5" : "border-gray-200"
                            )}
                        >
                            <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full",
                                learningStyle === style.id ? "bg-brand-orange text-white" : "bg-gray-100 text-gray-500"
                            )}>
                                <style.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium">{style.label}</div>
                                <div className="text-xs text-gray-500">{style.description}</div>
                            </div>
                            {learningStyle === style.id && (
                                <Check className="h-5 w-5 text-brand-orange" />
                            )}
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
