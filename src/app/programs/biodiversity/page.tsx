'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, Leaf, Globe } from 'lucide-react';
import { ProgramMediaSidebar } from '@/components/program-media-sidebar';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function BiodiversityPage() {
  const heroImage = getPlaceholderImage('program-biodiversity');

  const goals = [
    "To empower community for the protection and participate in conservation efforts.",
    "To advocate for implementation of both indigenous and science backed approaches for conservation.",
    "To task duty bearrers to effectively manngagement of natural resurces for sustainable."
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      {heroImage && (
        <header className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
          {/* Parallax-like Image Effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </motion.div>

          {/* Brand Overlay: Blue with multiply blend for depth */}
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />
          <div className="container mx-auto px-4 h-full">
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-4xl"
              >
                {/* Monotype Corsiva Accent */}
                <span className="block text-brand-yellow text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Monotype Corsiva' }}>
                  Preserving our Heritage
                </span>

                <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm max-w-4xl leading-tight">
                  Biodiversity & <span className="text-brand-green">Environment</span>
                </h1>

                <div className="mt-8 flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
      )}

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="lg:col-span-7 space-y-12">

            {/* Main Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-8">
                The world faces a growing climate crisis, yet many global development projects compromises the environment. This pattern weakens the critical conservation efforts needed to protect global ecosystems and prevent further climate breakdown.
              </p>

              <div className="space-y-6 text-gray-600">
                <p>
                  A compelling example of this conflict is the rapid growth of oil and gas projects within the sensitive Albertine Rift region. These developments pose serious threats to fragile ecosystems, fundamentally altering the environment and increasing the region’s climate vulnerability. The resulting environmental changes have severe consequences for local grassroots communities whose survival depends entirely on ecological stability and biodiversity.
                </p>

                {/* Decorative Quote using Brand Styles */}
                <div className="my-8 pl-6 border-l-4 border-brand-orange bg-orange-50/50 p-6 rounded-r-lg">
                  <p className="text-2xl text-brand-blue" style={{ fontFamily: 'Monotype Corsiva' }}>
                    "Therefore, this programme aims to empower local grassroots communities by increasing their capacity, awareness, and ability to be resilient and informed about efforts to prevent, mitigate, and restore their environment."
                  </p>
                </div>

                <p>
                  This is achieved by advocating for responsible policies and effectively using existing laws to promote environmental conservation while directly addressing the various environmental challenges facing these communities.
                </p>
              </div>
            </motion.article>

            {/* Strategic Goals Section */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-4 border-t border-gray-100"
            >
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-green/10 p-2 rounded-full">
                    <Leaf className="text-brand-green w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-blue">Program Goals</h3>
                </div>
                <p className="text-gray-500">Our commitment to a sustainable future</p>
              </div>

              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariant}
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <CheckCircle className="w-6 h-6 text-brand-orange flex-shrink-0 mt-1" />
                    <p className="text-gray-700 font-medium leading-relaxed">
                      {goal}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* MEP Movement Section */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-blue rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -mr-32 -mt-32" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-brand-blue font-bold uppercase tracking-widest text-sm mb-4">
                  <Globe className="w-4 h-4" />
                  Global Movement
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white leading-tight">
                  The Mother Earth Protection <br />
                  <span className="text-brand-blue" style={{ fontFamily: 'Monotype Corsiva', fontWeight: 'normal' }}>
                    (MEP) Movement
                  </span>
                </h2>

                <div className="space-y-6 text-orange-50 leading-relaxed">
                  <p>
                    Founded to empower communities to fulfill their role as the <span className="font-bold text-white">"original caretakers of Mother Earth,"</span> the MEP movement bridges the gap between ancient wisdom and modern action.
                  </p>
                  <p>
                    Our strategy is built on four pillars: Elder to Youth Knowledge Transfer, Protection of Reserve Areas, Innovative Solutions, and Community Training.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-1 bg-brand-blue rounded-full"></div>
                    <p className="text-sm italic text-orange-100">
                      "Integrating traditional knowledge with western technologies to create a powerful Earth management system."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div> */}

          </div>

          <div className="lg:col-span-5">
            <ProgramMediaSidebar
              youtubeUrl="https://www.youtube.com/watch?v=4oAtw0U3DJw"
              images={[
                "/images/our-story/mep.png",
                "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop"
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
