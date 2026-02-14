'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { publicService } from '@/lib/api/services/public.service';
import { SiteSettings } from '@/lib/api/models';

interface SettingsContextType {
    settings: SiteSettings | null;
    loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const response = await publicService.getSettings();
                if (response.success) {
                    setSettings(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch site settings:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
