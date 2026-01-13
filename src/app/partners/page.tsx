import Image from 'next/image';
import Link from 'next/link';
import { partners } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners',
};

export default function PartnersPage() {
  return (
    <div className="animate-enter">
      <header className="bg-accent py-16 text-accent-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Partners</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-accent-foreground/80">
            Collaboration is key to our success. We are proud to work with a diverse group of organizations who share our vision.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8">
          {partners.map((partner) => (
            <Link key={partner.name} href={partner.website} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <CardContent className="flex h-full flex-col items-center justify-center p-6">
                  <div className="relative h-16 w-full">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="mt-4 text-center font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">{partner.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
