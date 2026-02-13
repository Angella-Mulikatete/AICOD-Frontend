'use client';

import Image from 'next/image';
import { Target, Eye, Quote, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { contentService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { storyContent } from './data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function OurStoryPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [heroRes, contentRes] = await Promise.all([
          contentService.getHeroByPage('our-story').catch(() => ({ data: null })),
          contentService.getContentSections().catch(() => ({ data: [] }))
        ]);

        const missionSection = contentRes.data?.find((s: any) => s.section_key === 'mission');
        const visionSection = contentRes.data?.find((s: any) => s.section_key === 'vision');
        const historySection = contentRes.data?.find((s: any) => s.section_key === 'history' || s.title?.toLowerCase().includes('history'));

        setData({
          hero: heroRes.data,
          history: historySection,
          mission: missionSection,
          vision: visionSection
        });
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

  const hero = data?.hero || {};
  const history = data?.history || {
    title: "Our Story",
    content: "Building a sustainable future for the Albertine region since 2013."
  };

  const mission = data?.mission || {
    title: "Our Mission",
    content: "To advocate for the promotion and protection of the rights of disadvantaged communities, thereby safeguarding their livelihoods and environments."
  };
  const vision = data?.vision || {
    title: "Our Vision",
    content: "A community with respected rights, improved livelihoods, and a safe, clean environment."
  };

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={resolveImageUrl(hero.background_image, "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop")}
            alt="AICOD Community Work"
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
            >
              <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm mb-6">
                {hero.title || 'Our Story'}
              </h1>

              <div className="relative inline-block">
                <span className="text-2xl md:text-3xl text-brand-yellow" style={{ fontFamily: 'Monotype Corsiva' }}>
                  "{hero.subtitle || 'Empowering communities, protecting nature, and restoring dignity.'}"
                </span>
                <div className="mt-6 w-24 h-1.5 bg-brand-green rounded-full mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* LEFT COLUMN: History (Span 8) */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-8 border-brand-orange"
              >
                <h2 className="text-3xl font-bold text-brand-blue mb-8 flex items-center gap-3">
                  <span className="text-brand-orange text-4xl" style={{ fontFamily: 'Monotype Corsiva' }}>Our Journey</span>
                </h2>

                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {history.content ? (
                    <div dangerouslySetInnerHTML={{ __html: history.content }} />
                  ) : (
                    <>
                      {/* Fallback to static content if no API content exists */}
                      {storyContent.history.content.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))}
                      <div className="bg-brand-blue/5 p-6 rounded-lg border-l-4 border-brand-green mt-6">
                        <p className="italic text-brand-blue font-medium m-0">
                          "Our hope is that the benefits of these initiatives... can be shared globally, fostering a more equitable and sustainable future for all."
                        </p>
                      </div>
                    </>
                  )}
                </article>

              </motion.div>
            </div>

            {/* RIGHT COLUMN: Vision & Mission (Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-brand-blue relative overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Eye className="w-24 h-24 text-brand-blue" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-brand-blue/10 p-2 rounded-full">
                        <Eye className="w-6 h-6 text-brand-blue" />
                      </div>
                      <h2 className="text-2xl font-bold text-brand-blue">{vision.title}</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-brand-blue/20 absolute -top-2 -left-2" />
                      <div
                        className="text-lg text-gray-700 italic pl-6 relative z-10 font-medium text-justify prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: vision.content || 'A community with respected rights, improved livelihoods, and a safe, clean environment.' }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-brand-green/10 p-8 rounded-2xl shadow-lg border-l-8 border-brand-green relative overflow-hidden group hover:shadow-xl transition-shadow"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target className="w-24 h-24 text-brand-green" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white p-2 rounded-full shadow-sm">
                        <Target className="w-6 h-6 text-brand-green" />
                      </div>
                      <h2 className="text-2xl font-bold text-brand-green">{mission.title}</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-brand-green/20 absolute -top-2 -left-2" />
                      <div
                        className="text-lg text-gray-800 italic pl-6 relative z-10 text-justify prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: mission.content || 'To advocate for the promotion and protection of the rights of disadvantaged communities, thereby safeguarding their livelihoods and environments.' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
