'use client';

import Image from 'next/image';
import { Target, Eye, Quote, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { contentService, publicService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { PublicPage, HeroSection } from '@/lib/api/models';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function OurStoryPage() {
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [pageContent, setPageContent] = useState<PublicPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [heroRes, pageRes] = await Promise.all([
          contentService.getHeroByPage('our-story').catch(() => ({ success: false, data: null })),
          publicService.getPageBySlug('our-story').catch(() => ({ success: false, data: null }))
        ]);

        if (heroRes.success) setHero(heroRes.data);
        if (pageRes.success) setPageContent(pageRes.data);
      } catch (error) {
        console.error('Failed to fetch story data:', error);
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

  // Vision and Mission are often embedded in the page content or sections
  // We'll prioritize sections if they exist, otherwise use fallbacks
  const visionSection = pageContent?.sections?.find(s => s.section_type === 'vision' || s.title.toLowerCase().includes('vision'));
  const missionSection = pageContent?.sections?.find(s => s.section_type === 'mission' || s.title.toLowerCase().includes('mission'));

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={resolveImageUrl(hero?.background_image, "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop")}
            alt={hero?.title || "Our Story"}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-orange/80 mix-blend-multiply" />

        <div className="container mx-auto px-4 h-full">
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl"
            >
              <h1 className="font-bold text-5xl md:text-7xl text-white shadow-sm mb-8 italic">
                {hero?.title || 'Our Story'}
              </h1>

              <div className="relative inline-block">
                <p className="text-2xl md:text-3xl text-brand-yellow font-serif">
                  "{hero?.subtitle || 'Empowering communities, protecting nature, and restoring dignity.'}"
                </p>
                <div className="mt-8 w-32 h-1.5 bg-brand-green rounded-full mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-12 gap-16">

            {/* LEFT COLUMN: History (Span 8) */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-14 border-t-[12px] border-brand-orange relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -mr-16 -mt-16" />

                <h2 className="text-4xl font-extrabold text-brand-blue mb-10 flex items-center gap-4">
                  <div className="w-2 h-10 bg-brand-orange rounded-full" />
                  Our Journey
                </h2>

                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify space-y-6">
                  {pageContent?.content ? (
                    <div className="content-rendered" dangerouslySetInnerHTML={{ __html: pageContent.content }} />
                  ) : (
                    <p className="italic text-gray-400">Loading our history...</p>
                  )}
                </article>

                <div className="mt-12 p-8 bg-brand-blue/5 rounded-3xl border-l-[6px] border-brand-green relative">
                  <Quote className="absolute top-4 right-6 w-12 h-12 text-brand-blue/10" />
                  <p className="italic text-xl text-brand-blue font-medium m-0 leading-relaxed">
                    "Our hope is that the benefits of these initiatives can be shared globally, fostering a more equitable and sustainable future for all."
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Vision & Mission (Span 4) */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sticky top-28 space-y-10">

                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-10 rounded-[2rem] shadow-xl border-l-[10px] border-brand-blue relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
                    <Eye className="w-40 h-40 text-brand-blue" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-brand-blue/10 p-3 rounded-2xl">
                        <Eye className="w-8 h-8 text-brand-blue" />
                      </div>
                      <h2 className="text-3xl font-bold text-brand-blue">Our Vision</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-10 h-10 text-brand-blue/10 absolute -top-4 -left-6" />
                      <div className="text-xl text-gray-700 italic pl-6 relative z-10 font-medium leading-relaxed">
                        {visionSection?.content ? (
                          <div dangerouslySetInnerHTML={{ __html: visionSection.content }} />
                        ) : (
                          "A community with respected rights, improved livelihoods, and a safe, clean environment."
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-brand-green/5 p-10 rounded-[2rem] shadow-xl border-l-[10px] border-brand-green relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
                    <Target className="w-40 h-40 text-brand-green" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <Target className="w-8 h-8 text-brand-green" />
                      </div>
                      <h2 className="text-3xl font-bold text-brand-green">Our Mission</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-10 h-10 text-brand-green/10 absolute -top-4 -left-6" />
                      <div className="text-xl text-gray-800 italic pl-6 relative z-10 leading-relaxed">
                        {missionSection?.content ? (
                          <div dangerouslySetInnerHTML={{ __html: missionSection.content }} />
                        ) : (
                          "To advocate for the promotion and protection of the rights of disadvantaged communities, thereby safeguarding their livelihoods and environments."
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Impact Statement */}
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
                  <h4 className="font-bold text-brand-blue mb-2">Our impact matters</h4>
                  <p className="text-sm text-gray-600">
                    Since 2013, we have been dedicated to serving the Albertine region with integrity and transparency.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
