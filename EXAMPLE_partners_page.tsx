/**
 * EXAMPLE: API-Integrated Partners Page
 * 
 * This is an example of how to update src/app/partners/page.tsx
 * to use the AICOD backend API instead of static data.
 * 
 * To implement:
 * 1. Backup your current src/app/partners/page.tsx
 * 2. Replace its contents with this code
 * 3. Make sure backend is running (php artisan serve)
 * 4. Refresh the page
 */

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { type Metadata } from 'next';
import { api, getMediaUrl } from '@/lib/api';

export const metadata: Metadata = {
    title: 'Our Partners',
};

export default async function PartnersPage() {
    // Fetch partners from API
    let partners = [];
    try {
        const response = await api.getPartners();
        partners = response.data || [];
    } catch (error) {
        console.error('Failed to load partners:', error);
    }

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
                {partners.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-muted-foreground">
                            No partners to display at this time.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8">
                        {partners.map((partner) => (
                            <Link
                                key={partner.id}
                                href={partner.website || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                            >
                                <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                                    <CardContent className="flex h-full flex-col items-center justify-center p-6">
                                        {partner.logo ? (
                                            <div className="relative h-16 w-full">
                                                <Image
                                                    src={getMediaUrl(partner.logo)}
                                                    alt={`${partner.name} logo`}
                                                    fill
                                                    className="object-contain"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-16 w-full flex items-center justify-center bg-gray-100 rounded">
                                                <span className="text-2xl font-bold text-gray-400">
                                                    {partner.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <p className="mt-4 text-center font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            {partner.name}
                                        </p>
                                        {partner.description && (
                                            <p className="mt-2 text-xs text-center text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                {partner.description}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
