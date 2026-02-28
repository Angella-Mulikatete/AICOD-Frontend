'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import AICODLogo from "../../../public/assets/images/AICOD logo.jpg";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
interface MobileNavProps {
  items: any[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <VisuallyHidden.Root>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Access site navigation links and donation page.</SheetDescription>
        </VisuallyHidden.Root>
        <div className="flex h-full flex-col py-6">
          <Link href="/" className="px-4 flex items-center" onClick={() => setIsOpen(false)}>
            <Image
              src={AICODLogo}
              alt="AICOD Logo"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="mt-8 flex flex-col gap-2">
            <Accordion type="single" collapsible className="w-full">
              {items.map((link) =>
                link.children && link.children.length > 0 ? (
                  <AccordionItem value={link.label} key={link.label}>
                    <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline">
                      {link.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-8">
                        {link.children.map((subLink: any) => (
                          <Link
                            key={subLink.label}
                            href={subLink.url}
                            className="block rounded-md p-2 text-base text-muted-foreground hover:bg-brand-orange hover:text-white"
                            onClick={() => setIsOpen(false)}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <Link
                    key={link.label}
                    href={link.url}
                    className="block rounded-md p-4 text-lg font-semibold hover:bg-brand-orange hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </Accordion>
          </div>
          <div className="mt-auto px-4">
            <Button asChild className="w-full bg-brand-orange text-white hover:bg-brand-orange/90" onClick={() => setIsOpen(false)}>
              <Link href="/donations">Donate Now</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
