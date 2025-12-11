'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { Users, Sprout, HandCoins, ArrowRight } from 'lucide-react';
import { ProgramMediaSidebar } from '@/components/program-media-sidebar';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CommunityLivelihoodPage() {
  const heroImage = getPlaceholderImage('program-livelihood');

  const goals = [
    {
      title: "Sustainable Livelihoods",
      desc: "Building capacity via sustainable agricultural practices, financial literacy, and market access.",
      icon: <Sprout className="w-8 h-8 text-white" />,
      bg: "bg-brand-green"
    },
    {
      title: "Living Standards",
      desc: "Improving access to basic needs like clean water, education, and healthcare for all families.",
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "bg-brand-orange"
    },
    {
      title: "Governance",
      desc: "Empowering communities to participate in decision-making processes regarding natural resources.",
      icon: <HandCoins className="w-8 h-8 text-white" />,
      bg: "bg-brand-yellow"
    }
  ];

  const sidebarImages = [
    "/images/our-story/skills.png",
    "/images/our-story/one-team.png",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground overflow-x-hidden">

      {/* --- 1. HERO SECTION --- */}
      {heroImage && (
        <header className="relative h-[60vh] min-h-[400px] md:min-h-[500px] w-full overflow-hidden">
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
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />

          <div className="container mx-auto px-4 sm:px-6 h-full relative z-10 flex flex-col items-center justify-center text-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp} 
              className="max-w-4xl"
            >
              <span className="block text-brand-yellow text-xl sm:text-2xl md:text-3xl mb-3" style={{ fontFamily: 'Monotype Corsiva' }}>
                Empowering People
              </span>
              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-white shadow-sm leading-tight">
                Community & <span className="text-brand-orange block sm:inline">Livelihoods</span>
              </h1>
              <div className="mt-8 flex justify-center gap-3">
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-green animate-pulse"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-yellow animate-pulse delay-75"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-brand-orange animate-pulse delay-150"></div>
              </div>
            </motion.div>
          </div>
        </header>
      )}

      {/* --- 2. INTRODUCTORY STATEMENT (Full Width) --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg md:prose-xl mx-auto text-gray-700"
          >
            <p className="font-medium text-brand-blue leading-relaxed">
              This Program aims to enhance the living standards of indigenous and host communities within the Albertine region. We focus on sustainable practices that empower communities to thrive frugally while respecting their cultural and environmental settings.
            </p>
            <div className="h-1 w-20 bg-brand-yellow mx-auto mt-8 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* --- 3. GOALS GRID (Distinct Section) --- */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-blue">Strategic Goals</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`${goal.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{goal.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {goal.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- 4. DETAILED INITIATIVES (Split Layout) --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Deep Dive Content (Span 7) */}
          <div className="lg:col-span-7 space-y-12">

            {/* Initiative 1: Innovative Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue font-bold text-xl">1</div>
                <h2 className="text-2xl md:text-3xl font-bold text-brand-blue">Innovative Livelihood Skills</h2>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Empowering communities devastated by natural resource developments to restore and enrich their livelihoods. We support native-based approaches and movements capable of defending rights and building an entrepreneurship culture.
                </p>
                <div className="grid gap-4 bg-slate-50 p-6 rounded-xl">
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-orange block mb-1">The Challenge</span>
                    <p className="text-sm text-gray-700">Mismanagement of land compensation monies leading to increased poverty vulnerability.</p>
                  </div>
                  <div className="w-full h-px bg-gray-200"></div>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-green block mb-1">Our Solution</span>
                    <p className="text-sm text-gray-700">Training on financial literacy, business planning, bookkeeping, and technology integration.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Initiative 2: One Team (Visual Break) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-blue rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl"
            >
              {/* Background Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-brand-yellow text-brand-blue text-xs font-bold uppercase rounded-full">Flagship Program</span>
                </div>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">One Team Initiative</h2>

                <div className="space-y-6 text-blue-50 leading-relaxed text-base md:text-lg">
                  <p>
                    An economic program designed to empower community members to generate their own economic resources, tackling the lack of access to affordable financing.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 mt-8 pt-8 border-t border-white/10">
                    <div>
                      <p className="text-3xl font-bold text-brand-yellow mb-1">100+</p>
                      <p className="text-xs uppercase tracking-wide opacity-70">Households Joined</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-brand-green mb-1">Economic</p>
                      <p className="text-xs uppercase tracking-wide opacity-70">Projects Launched</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Sidebar (Span 5) */}
          <div className="lg:col-span-5 order-first lg:order-last">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* <div className="bg-brand-orange/5 border border-brand-orange/10 rounded-xl p-6 mb-8">
                <h4 className="font-bold text-brand-orange mb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Program Gallery
                </h4>
                <p className="text-sm text-gray-600">
                  Witness the transformation in the Albertine region through our media archive.
                </p>
              </div> */}

              <ProgramMediaSidebar
                youtubeUrl="https://www.youtube.com/watch?v=8Hc2iKu1nko"
                images={sidebarImages}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}