'use client';

import { useState, useEffect } from 'react';
import { contentService, publicService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
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
import { navLinks } from '@/lib/nav-links';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState<any[]>(navLinks);
  const [companyInfo, setCompanyInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, companyRes] = await Promise.all([
          contentService.getMenuByLocation('header').catch(() => ({ success: false, data: [] })),
          publicService.getCompanies().catch(() => ({ success: false, data: [] }))
        ]);

        if (menuRes.success && menuRes.data) {
          const items = Array.isArray(menuRes.data) ? menuRes.data : (menuRes.data.items || []);
          const normalizedLinks = items.map((item: any) => {
            const isDonate = item.label?.toLowerCase().includes('donate') || item.title?.toLowerCase().includes('donate');
            return {
              title: item.label || item.title,
              href: isDonate ? '/donations' : (item.url || item.href),
              subLinks: (item.children || item.subLinks)?.map((child: any) => ({
                title: child.label || child.title,
                href: child.url || child.href,
                description: child.description
              }))
            };
          });
          setLinks(normalizedLinks);
        }

        if (companyRes.success && companyRes.data && companyRes.data.length > 0) {
          setCompanyInfo(companyRes.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch mobile menu data:', error);
      }
    }
    fetchData();
  }, []);

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
              src={resolveImageUrl(companyInfo?.logo, AICODLogo.src)}
              alt={companyInfo?.name || "AICOD Logo"}
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <div className="mt-8 flex flex-col gap-2">
            <Accordion type="single" collapsible className="w-full">
              {links.map((link) =>
                link.subLinks && link.subLinks.length > 0 ? (
                  <AccordionItem value={link.title} key={link.title}>
                    <AccordionTrigger className="px-4 text-lg font-semibold hover:no-underline font-sans">
                      {link.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-1 pl-8">
                        {link.subLinks.map((subLink: any) => (
                          <Link
                            key={subLink.title}
                            href={subLink.href}
                            className="block rounded-md p-2 text-base text-muted-foreground hover:bg-brand-orange hover:text-white transition-colors"
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
                    className="block rounded-md p-4 text-lg font-semibold hover:bg-brand-orange hover:text-white transition-colors font-sans"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
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
