'use client';

import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { contentService } from '@/lib/api/services/public.service';

import { resolveImageUrl } from '@/lib/utils';
import { FAQSection } from '@/components/faq-section';

export default function DonationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contentService.getHeroByPage('donations').catch(() => ({ data: null }));
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch donations data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  const hero = data || {};

  return (
    <div className="animate-enter">
      <header className="relative py-16 text-white md:py-24 overflow-hidden">
        <Image
          src={resolveImageUrl(hero.background_image, "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop")}
          alt="Community support and donation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/70 to-brand-orange/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-lg">
            {hero.title || 'Support Our Work'}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg drop-shadow-md">
            {hero.subtitle || 'Your contribution makes a real difference in the lives of the communities we serve.'}
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-blue">Get Involved</h2>
            <div className="w-12 h-1 bg-brand-orange rounded-full" />
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that true impact is built on trust and protection. To ensure your support reaches the right hands securely, we handle all partnerships and donations through direct contact.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Please reach out to our team to discuss how you can support our mission—whether through financial contribution, equipment, or expertise. We look forward to building a meaningful partnership with you.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-brand-green hover:bg-[#7FB32D] text-white rounded-full px-8">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Us to Support
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
              alt="Volunteers helping community"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" />
          </div>

        </div>

      {/* --- FAQ SECTION --- */}
      <FAQSection />
      </div>
    </div>
  );
}
