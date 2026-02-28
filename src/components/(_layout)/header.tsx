'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { MobileNav } from './mobile-nav';
import { Button } from '../ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
import AICODLogo from "../../../public/assets/images/AICOD logo.jpg";
import { publicService } from '@/lib/api/services/public.service';

const Dropdown = ({ link }: { link: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group h-full flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        type="button"
      >
        {link.label}
        <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 pt-2 w-48">
          <div className="bg-background border border-border rounded-md shadow-lg p-1">
            <ul className="text-sm font-medium">
              {link.children?.map((subLink: any) => (
                <li key={subLink.label}>
                  <Link
                    href={subLink.url}
                    className="block w-full p-2 text-foreground hover:bg-brand-orange hover:text-accent-foreground rounded transition-colors"
                  >
                    {subLink.label}
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
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [menuRes, companyRes] = await Promise.all([
          publicService.getMenuByLocation('header'),
          publicService.getCompany(1)
        ]);

        if (menuRes.success) {
          setNavLinks(menuRes.data);
        }

        if (companyRes.success && companyRes.data.logo) {
          // Check if logo is a full URL or relative
          const logoPath = companyRes.data.logo;
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
          setLogoUrl(logoPath.startsWith('http') ? logoPath : `${backendUrl}/${logoPath}`);
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
            src={logoUrl || AICODLogo}
            alt="AICOD Connect"
            width={250}
            height={200}
            priority
            className="h-full w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-2 h-full">
          {loading ? (
            <div className="flex items-center px-4">
              <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
            </div>
          ) : (
            <nav className="flex items-center gap-1 h-full">
              {navLinks.map((link) =>
                link.children && link.children.length > 0 ? (
                  <Dropdown key={link.label} link={link} />
                ) : (
                  <Link
                    key={link.label}
                    href={link.url}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          )}
          <Button asChild className="ml-2 bg-brand-orange text-accent-foreground hover:bg-accent/90">
            <Link href="/donations">Donate Now</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <MobileNav items={navLinks} />
        </div>
      </div>
    </header>
  );
}







