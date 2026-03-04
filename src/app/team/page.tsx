'use client';

import Image from 'next/image';
import { publicService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const [teamRes, heroRes] = await Promise.all([
          publicService.getTeam().catch(() => ({ success: false, data: [] })),
          contentService.getHeroByPage('team').catch(() => ({ data: null }))
        ]);

        if (teamRes.success) {
          setTeam(teamRes.data);
        }
        setHero(heroRes.data);
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="animate-enter min-h-screen">
      <header className="relative py-20 text-white md:py-32 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={resolveImageUrl(hero?.background_image, "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop")}
            alt="Our Team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-bold text-4xl md:text-6xl drop-shadow-lg">{hero?.title || 'Our Team'}</h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-blue-100 drop-shadow-md">
            {hero?.subtitle || 'Meet the passionate individuals behind AICOD.'}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member: any) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-brand-orange/20">
                  <Image
                    src={resolveImageUrl(member.profile_photo, '/assets/images/aicodlogo.png')}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-blue text-center">{member.name}</h3>
                <p className="text-brand-orange font-medium text-center">{member.position || 'Team Member'}</p>
                <p className="text-gray-500 text-sm mt-2 text-center line-clamp-3">{member.bio}</p>
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
