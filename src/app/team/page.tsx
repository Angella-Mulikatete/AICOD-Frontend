'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { publicService, contentService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { HeroSection } from '@/lib/api/models';
import { Loader2 } from 'lucide-react';

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [teamRes, heroRes] = await Promise.all([
          publicService.getTeam().catch(() => ({ success: false, data: [] })),
          contentService.getHeroByPage('team').catch(() => ({ success: false, data: null }))
        ]);

        if (teamRes.success) setTeam(teamRes.data);
        if (heroRes.success) setHero(heroRes.data);
      } catch (err) {
        console.error("Team page fetch error", err);
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

  return (
    <div className="animate-enter bg-white min-h-screen">
      <header className="relative py-24 text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={resolveImageUrl(hero?.background_image, "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop")}
            alt={hero?.title || "Our Team"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brand-blue/70 mix-blend-multiply" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 shadow-sm italic">
            {hero?.title || 'Our Team'}
          </h1>
          <p className="text-blue-50 max-w-2xl mx-auto px-4 text-lg">
            {hero?.subtitle || 'Meet the passionate individuals behind AICOD, dedicated to community empowerment and sustainable development.'}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member: any) => (
              <div key={member.id} className="group flex flex-col items-center bg-slate-50 p-6 rounded-3xl hover:shadow-xl transition-all duration-300">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={resolveImageUrl(member.profile_photo, '/assets/images/aicodlogo.png')}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-blue text-center">{member.name}</h3>
                <p className="text-brand-orange font-semibold uppercase tracking-wider text-xs mt-1">{member.position || 'Team Member'}</p>
                <p className="text-gray-500 text-sm mt-4 text-center line-clamp-3 italic px-4">"{member.bio}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <h2 className="text-center font-headline text-3xl font-bold text-brand-blue">
              Our Team is Growing
            </h2>
            <p className="mt-4 max-w-xl text-center text-lg text-gray-600">
              We are working hard to bring you information about our dedicated team. Please check back soon!
            </p>
            <div className="my-8 max-w-4xl w-full">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team Placeholder"
                width={1200}
                height={600}
                className="rounded-lg shadow-md aspect-video object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
