'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, Scale, Megaphone, Users2 } from 'lucide-react';
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

export default function HumanRightsPage() {
  const heroImage = getPlaceholderImage('program-human-rights');

  const goalIcons = [
    <Scale key="1" className="w-6 h-6 text-white" />,
    <Megaphone key="2" className="w-6 h-6 text-white" />,
    <Users2 key="3" className="w-6 h-6 text-white" />
  ];

  const goals = [
    "To empower and build community members’ capacity: This is achived through providing training and building community’s capcity on relevant laws and regulations to land rights, Free Prior and Informed Consent ( FPIC).",
    "Create Platforms for Engagement: This is achived through provision of forum where communitys interact with duty bearers and stakehoders and foster dialogues among communitys with decision makers to address grievances while advocating for fair practices in resource developments.",
    "Strengthen Community Movements: This is achived through strong community mobilization to form associations, groups and empowered with capacities to obverse and lead the cause for their own developments."
  ];

  const sidebarImages = [
    "/images/our-story/civic.png",
    "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      {heroImage && (
        <header className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
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
              className="object-cover object-center"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </motion.div>

          {/* Brand Overlay */}
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />

          {/* 
             ALIGNMENT FIX:
             Using 'container mx-auto px-4' ensures the content box matches the Header exactly.
             h-full allows vertical centering within that box.
          */}
          <div className="container mx-auto px-4 h-full relative z-10">
            <div className="flex h-full flex-col items-center justify-center text-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="max-w-4xl"
              >
                <span className="block text-brand-yellow text-xl md:text-3xl mb-3" style={{ fontFamily: 'Monotype Corsiva' }}>
                  Equality & Justice
                </span>

                <h1 className="font-bold text-3xl md:text-6xl text-white shadow-sm leading-tight">
                  Human Rights & <br className="hidden md:block" />
                  <span className="text-brand-orange">Inclusive Development</span>
                </h1>

                <div className="mt-8 flex justify-center gap-3">
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-green animate-pulse"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-yellow animate-pulse delay-75"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-orange animate-pulse delay-150"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
      )}

      {/* --- MAIN CONTENT --- */}

      <div className="container mx-auto px-4 py-12 md:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* --- LEFT COLUMN: CONTENT (7 Cols) --- */}
          <div className="lg:col-span-7 space-y-16">

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-6">
                The intersection of natural resource developments and human rights is a critical concern for host communities, particularly the native populations who often bear the burdens of large scale projects while facing violations of their rights.
              </p>
              <p className="text-base md:text-lg leading-relaxed">
                Recognizing these issues, our program promotes human rights and inclusive development by empowering communities, working with key community groups and building a system to protect their rights in the Albertine development areas.
              </p>
            </motion.div>


            {/* Strategic Goals Section */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-8 border-t border-gray-100"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-1.5 bg-brand-green rounded-full"></div>
                <h3 className="text-2xl font-bold text-brand-blue">Strategic Goals</h3>
              </div>

              <div className="grid gap-6">
                {goals.map((goalString, index) => {
                  const [title, description] = goalString.split(':');
                  return (
                    <motion.div
                      key={index}
                      variants={cardVariant}
                      className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="bg-brand-blue w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300">
                          {goalIcons[index]}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-brand-blue mb-2 group-hover:text-brand-orange transition-colors">
                            {title}
                          </h4>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {description ? description.trim() : goalString}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: MEDIA SIDEBAR (5 Cols) --- */}
          <div className="lg:col-span-5 w-full">
            <div className="lg:sticky lg:top-24 space-y-8">
              <ProgramMediaSidebar
                youtubeUrl="https://www.youtube.com/watch?v=6e8m8L9BFa4"
                images={sidebarImages}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}