'use client';

import Link from 'next/link';
import Image from 'next/image'; 
import React, { useState } from 'react';
import { navLinks } from '@/lib/nav-links';
import { MobileNav } from './mobile-nav';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';
import AICODLogo from "../../../public/assets/AICOD F.png";



const Dropdown = ({ link }: { link: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
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

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg w-48">
          <ul className="p-2 text-sm font-medium">
            {link.subLinks?.map((subLink: any) => (
              <li key={subLink.title}>
                <Link
                  href={subLink.href}
                  className="block w-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground rounded transition-colors"
                >
                  {subLink.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <Image 
            src={AICODLogo} 
            alt="AICOD Connect" 
            width={200} 
            height={60}
            priority
            className="h-auto w-auto max-h-12"
          />
        </Link>

        <div className="hidden md:flex md:items-center md:gap-2">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) =>
              link.subLinks ? (
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
          <Button asChild className="ml-2 bg-accent text-accent-foreground hover:bg-accent/90">
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







