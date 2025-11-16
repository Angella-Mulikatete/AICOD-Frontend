import Link from 'next/link';
import { Facebook, Twitter } from 'lucide-react';
import { navLinks } from '@/lib/nav-links';

const XIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153Zm-1.65 19.54h2.6l-11.287-16.1h-2.68l11.367 16.1Z" />
    </svg>
)

export function Footer() {
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'X', href: '#', icon: XIcon },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-full lg:col-span-1">
            <Link href="/" className="font-headline text-2xl font-bold text-primary">
              AICOD Connect
            </Link>
            <p className="mt-4 text-muted-foreground">
              Albertine Institute For Community Development
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">About</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/our-story" className="text-muted-foreground hover:text-primary">
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link href="/impact" className="text-muted-foreground hover:text-primary">
                      Impact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Programs</h3>
                <ul className="mt-4 space-y-2">
                  {navLinks.find(l => l.title === 'Programs')?.subLinks?.map(link => (
                     <li key={link.title}>
                        <Link href={link.href} className="text-muted-foreground hover:text-primary">
                          {link.title}
                        </Link>
                     </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wider text-primary">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/donations" className="text-muted-foreground hover:text-primary">
                      Donations
                    </Link>
                  </li>
                  <li>
                    <Link href="/partners" className="text-muted-foreground hover:text-primary">
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-primary">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AICOD Connect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
