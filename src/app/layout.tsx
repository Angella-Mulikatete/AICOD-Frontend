import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/(_layout)/header';
import { Footer } from '@/components/(_layout)/footer';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as ShadcnToaster } from '@/components/ui/toaster';
import { ChatProvider } from '@/contexts/chat-context';
import { AICODChatbot } from '@/components/chat/chatbot';
import { SettingsProvider } from '@/context/settings-context';

export const metadata: Metadata = {
  title: {
    default: 'AICOD Connect',
    template: '%s | AICOD Connect',
  },
  description: 'Albertine Institute For Community Development - Driving positive change in biodiversity, human rights, and community livelihoods.',
  icons: {
    icon: '/assets/images/AICOD logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-arialBold">
        <SettingsProvider>
          <ChatProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <AICODChatbot />
            <Toaster />
            <ShadcnToaster />
          </ChatProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}





