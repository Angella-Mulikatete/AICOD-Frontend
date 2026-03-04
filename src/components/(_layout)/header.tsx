'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { navLinks } from '@/lib/nav-links';
import { MobileNav } from './mobile-nav';
import { Button } from '../ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
import { contentService, publicService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import AICODLogo from "../../../public/assets/images/AICOD logo.jpg";

const Dropdown = ({ link }: { link: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group h-full flex items-center" // Added flex items-center to center nav text vertically
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        type="button"
      >
        {link.title}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>


      {isOpen && (
        <div className="absolute top-full left-0 z-50 pt-2 w-48">
          <div className="bg-background border border-border rounded-md shadow-lg p-1">
            <ul className="text-sm font-medium">
              {link.subLinks?.map((subLink: any) => (
                <li key={subLink.title}>
                  <Link
                    href={subLink.href}
                    className="block w-full p-2 text-foreground hover:bg-brand-orange hover:text-accent-foreground rounded transition-colors"
                  >
                    {subLink.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export function Header() {
  const [links, setLinks] = useState<any[]>(navLinks);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        console.error('Failed to fetch header data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">

        <Link href="/" className="flex items-center h-full py-2">
          <Image
            src={resolveImageUrl(companyInfo?.logo, AICODLogo.src)}
            alt={companyInfo?.name || "AICOD"}
            width={250}
            height={200}
            priority
            className="h-full w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-2 h-full">
          <nav className="flex items-center gap-1 h-full">
            {links.map((link) =>
              link.subLinks && link.subLinks.length > 0 ? (
                <Dropdown key={link.title} link={link} />
              ) : (
                <Link
                  key={link.title}
                  href={link.href}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {link.title}
                </Link>
              )
            )}
          </nav>
          <Button asChild className="ml-2 bg-brand-orange text-accent-foreground hover:bg-accent/90">
            <Link href="/donations">Donate Now</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}







