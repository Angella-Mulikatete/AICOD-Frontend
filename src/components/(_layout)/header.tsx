'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';
import { navLinks } from '@/lib/nav-links';
import { MobileNav } from './mobile-nav';
import { Button } from '../ui/button';

const AICODLogo = () => (
  <svg width="40" height="40" viewBox="0 0 162 162" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="81" cy="81" r="81" fill="url(#paint0_linear_1_2)"/>
    <path d="M81 162C125.748 162 162 125.748 162 81C162 36.2517 125.748 0 81 0C36.2517 0 0 36.2517 0 81C0 125.748 36.2517 162 81 162ZM81 150.346C119.537 150.346 150.346 119.537 150.346 81C150.346 42.4633 119.537 11.6538 81 11.6538C42.4633 11.6538 11.6538 42.4633 11.6538 81C11.6538 119.537 42.4633 150.346 81 150.346Z" fill="#3BB0BA"/>
    <path d="M81.0019 129.54C107.822 129.54 129.542 107.82 129.542 81C129.542 54.1802 107.822 32.46 81.0019 32.46C54.1816 32.46 32.4619 54.1802 32.4619 81C32.4619 107.82 54.1816 129.54 81.0019 129.54Z" fill="white"/>
    <path d="M81 99.432C91.1969 99.432 99.432 91.1969 99.432 81C99.432 70.8031 91.1969 62.568 81 62.568C70.8031 62.568 62.568 70.8031 62.568 81C62.568 91.1969 70.8031 99.432 81 99.432Z" fill="#293B5F"/>
    <defs>
    <linearGradient id="paint0_linear_1_2" x1="81" y1="0" x2="81" y2="162" gradientUnits="userSpaceOnUse">
    <stop stopColor="#293B5F"/>
    <stop offset="1" stopColor="#3BB0BA"/>
    </linearGradient>
    </defs>
  </svg>
);


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <AICODLogo />
          <span className="hidden font-headline font-bold text-primary sm:inline-block">
            AICOD Connect
          </span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) =>
                link.subLinks ? (
                  <NavigationMenuItem key={link.title}>
                    <NavigationMenuTrigger className="font-semibold">{link.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {link.subLinks.map((subLink) => (
                          <ListItem key={subLink.title} href={subLink.href} title={subLink.title}>
                            {subLink.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={link.title}>
                    <Link href={link.href} legacyBehavior passHref>
                      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "font-semibold")}>
                        {link.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
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

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
