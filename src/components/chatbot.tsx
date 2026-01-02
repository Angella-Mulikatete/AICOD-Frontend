'use client';

import { useState, useRef, useEffect } from 'react';
import { BotMessageSquare, Send, X, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatbotResponse } from '@/lib/action';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from './ui/avatar';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'model', content: "Hello! I'm the AICOD assistant. How can I help you today?" }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      // A bit of a hack to scroll to bottom after new message is rendered.
      setTimeout(() => {
        if (scrollAreaRef.current) {
          const viewport = scrollAreaRef.current.querySelector('[data-slot="scroll-area-viewport"]');
          if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
          }
        }
      }, 100);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const { success, response } = await getChatbotResponse(input, messages);

    const botMessage: Message = { role: 'model', content: response };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg transition-transform hover:scale-110 hover:bg-primary/90"
        onClick={() => setIsOpen(true)}
        aria-label="Open Chatbot"
      >
        <BotMessageSquare className="h-8 w-8 text-primary-foreground" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex h-[80vh] max-h-[700px] w-[90vw] max-w-md flex-col p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-2">
            <DialogTitle className="font-headline text-lg">AICOD Assistant</DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-grow px-4" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'model' && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        <BotMessageSquare className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      <BotMessageSquare className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted text-muted-foreground">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 pt-2">
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                autoComplete="off"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
