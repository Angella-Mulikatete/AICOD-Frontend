'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navLinks } from '@/lib/nav-links';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex h-full flex-col py-6">
          <Link href="/" className="px-4 font-headline text-2xl font-bold" onClick={() => setIsOpen(false)}>
            AICOD Connect
          </Link>
          <div className="mt-8 flex flex-col gap-2">
            <Accordion type="single" collapsible className="w-full">
              {navLinks.map((link) =>
                link.subLinks ? (
                  <AccordionItem value={link.title} key={link.title}>
                    <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline">
                      {link.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-8">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.title}
                            href={subLink.href}
                            className="block rounded-md p-2 text-base text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {subLink.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="block rounded-md p-4 text-lg font-semibold hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                )
              )}
            </Accordion>
          </div>
          <div className="mt-auto px-4">
             <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsOpen(false)}>
                <Link href="/donations">Donate Now</Link>
             </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
