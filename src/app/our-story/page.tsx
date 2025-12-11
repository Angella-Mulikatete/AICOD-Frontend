'use client';

import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { storyContent } from './data'; // Assuming data.ts is in the same folder
import { Target, Eye, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as const } }
};

export default function OurStoryPage() {
  const storyImage = getPlaceholderImage('our-story-main');

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
        {storyImage && (
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={storyImage.imageUrl}
              alt="AICOD Community Work"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        {/* Brand Overlay: Orange mixed with Blue for a warm, serious tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-orange/80 mix-blend-multiply" />

        <div className="container mx-auto px-4 h-full">
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm mb-6">
                {storyContent.history.title}
              </h1>

              <div className="relative inline-block">
                <span className="text-2xl md:text-3xl text-brand-yellow" style={{ fontFamily: 'Monotype Corsiva' }}>
                  "Empowering communities, protecting nature, and restoring dignity."
                </span>
                <div className="mt-6 w-24 h-1.5 bg-brand-green rounded-full mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto -mt-26 relative z-20">
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
                  <span className="text-brand-orange text-4xl" style={{ fontFamily: 'Monotype Corsiva' }}>The Journey</span> of AICOD
                </h2>

                <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  {/* All Content */}
                  {storyContent.history.content.map((para, idx) => (
                    <p key={idx} className={idx === 0 ? "text-xl" : ""}>
                      {para}
                    </p>
                  ))}

                  {/* Closing Quote Block */}
                  <div className="bg-brand-blue/5 p-6 rounded-lg border-l-4 border-brand-green mt-6">
                    <p className="italic text-brand-blue font-medium m-0">
                      "Our hope is that the benefits of these initiatives... can be shared globally, fostering a more equitable and sustainable future for all."
                    </p>
                  </div>
                </article>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Vision & Mission (Span 4) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-24 space-y-8">

                {/* Vision Card */}
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
                      <h2 className="text-2xl font-bold text-brand-blue">Our Vision</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-brand-blue/20 absolute -top-2 -left-2" />
                      <p className="text-lg text-gray-700 italic pl-6 relative z-10 font-medium">
                        "{storyContent.vision}"
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mission Card */}
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
                      <h2 className="text-2xl font-bold text-brand-green">Our Mission</h2>
                    </div>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-brand-green/20 absolute -top-2 -left-2" />
                      <p className="text-lg text-gray-800 italic pl-6 relative z-10">
                        "{storyContent.mission}"
                      </p>
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
