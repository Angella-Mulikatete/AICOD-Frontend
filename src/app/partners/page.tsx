'use client';

import Image from 'next/image';
import Link from 'next/link';
import { publicService } from '@/lib/api/services/public.service';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { resolveImageUrl } from '@/lib/utils';
import { Building2, Loader2 } from 'lucide-react';

export default function PartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const response = await publicService.getCompanies().catch(() => ({ data: [] }));

        // Defensive normalization of partners data
        let partnersData = [];
        if (Array.isArray(response)) {
          partnersData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          partnersData = response.data;
        } else if (response?.data?.companies && Array.isArray(response.data.companies)) {
          partnersData = response.data.companies;
        }
        setPartners(partnersData);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="animate-enter overflow-hidden">
      <header className="bg-accent py-16 text-accent-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Partners</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-accent-foreground/80">
            Collaboration is key to our success. We are proud to work with a diverse group of organizations who share our vision.
          </p>
        </div>
      </header>

      <div className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        {/* Infinite Slider */}
        <div className="relative w-full flex">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          {partners.length > 0 ? (
            <motion.div
              className="flex gap-16 md:gap-24 whitespace-nowrap pl-16"
              animate={{ x: [0, -2000] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex flex-col items-center gap-4 group cursor-default opacity-70 hover:opacity-100 transition-opacity duration-300">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center shadow-sm hover:shadow-md">
                    {partner.logo ? (
                      <Image
                        src={resolveImageUrl(partner.logo, '/assets/images/aicodlogo.png')}
                        alt={partner.name || "Partner"}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    ) : (
                      <Building2 className="w-12 h-12 text-gray-400 group-hover:text-brand-blue transition-colors" />
                    )}
                  </div>
                  <span className="font-bold text-lg text-gray-400 group-hover:text-brand-blue transition-colors max-w-[150px] truncate">
                    {partner.name}
                  </span>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="container mx-auto text-center py-20">
              <p className="text-gray-500 italic">No partners found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Grid view below for accessibility/detail if needed, or just stay as carousel? 
          The user asked for a continuous carousel. I'll keep the grid view below but as a secondary static section?
          Actually, the user said "i want the carousel to be continuous", implying they want that to be the main way to see them.
          I'll add the grid back below it for better browsing, but make the carousel the hero element of the page.
      */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-2xl font-bold text-brand-blue mb-12 text-center">Meet Our Strategic Allies</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-8">
          {partners.map((partner: any) => (
            <Link key={partner.id} href={partner.website || '#'} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-slate-100">
                <CardContent className="flex h-full flex-col items-center justify-center p-6">
                  <div className="relative h-16 w-full mb-2">
                    <Image
                      src={resolveImageUrl(partner.logo, '/assets/images/aicodlogo.png')}
                      alt={`${partner.name} logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <p className="mt-2 text-center font-bold text-brand-blue text-sm">{partner.name}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
