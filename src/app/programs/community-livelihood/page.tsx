'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, ChevronDown, ChevronUp, Users, Sprout, HandCoins, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function CommunityLivelihoodPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const heroImage = getPlaceholderImage('program-livelihood');

  const goals = [
    {
      title: "Sustainable Livelihoods",
      desc: "Build community capacity via sustainable agricultural practices, environmentally friendly strategies, financial literacy, and market access.",
      icon: <Sprout className="w-6 h-6 text-brand-green" />
    },
    {
      title: "Sustainable Living Standards",
      desc: "Inspire communities through initiatives that improve access to basic needs like clean water, education, and healthcare.",
      icon: <Users className="w-6 h-6 text-brand-orange" />
    },
    {
      title: "Natural Resource Governance",
      desc: "Empower communities to participate in decision-making processes, ensuring their voices are heard in natural resource management.",
      icon: <HandCoins className="w-6 h-6 text-brand-yellow" />
    }
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground overflow-x-hidden">

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

          {/* Brand Overlay: Blue with opacity */}
          <div className="absolute inset-0 bg-brand-blue/75 mix-blend-multiply" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="block text-brand-yellow text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Monotype Corsiva' }}>
                Empowering People
              </span>

              <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm max-w-5xl leading-tight">
                Community & <span className="text-brand-orange">Livelihoods</span>
              </h1>

              <div className="mt-6 w-32 h-2 bg-brand-green rounded-full mx-auto" />
            </motion.div>
          </div>
        </header>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-16 -mt-16 relative z-20">

        {/* --- INTRO CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-t-8 border-brand-orange mb-20"
        >
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-6">
              This Program aims to enhance the living standards of indigenous and host communities within the Albertine region, especially as it relates to natural resource sector developments.
            </p>
            <p className="text-lg">
              This initiative focuses on sustainable practices that empower communities to thrive frugally while respecting their cultural and environmental settings.
            </p>
          </div>
        </motion.div>

        {/* --- GOALS SECTION --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-blue mb-3">Program Goals</h3>
            <div className="w-16 h-1 bg-brand-yellow mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ y: -10 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-brand-green hover:shadow-lg transition-all duration-300 group"
              >
                <div className="bg-white w-14 h-14 rounded-full shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {goal.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-blue mb-3">{goal.title}</h4>
                <p className="text-gray-600 leading-relaxed">
                  {goal.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- FEATURE: SKILLS DEVELOPMENT --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-brand-green mb-6">Innovative Livelihood Skills</h2>

            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Empowering communities devastated by natural resource developments to restore and enrich their livelihoods. We support native-based approaches and movements capable of defending rights and building an entrepreneurship culture.
              </p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-4 border-l-4 border-brand-blue pl-4 bg-blue-50/50 rounded-r-lg p-4">
                      <p>
                        <span className="font-bold text-brand-blue">The Challenge:</span> Due to limited capacity in managing compensation monies from lost land, many community members became vulnerable to poverty.
                      </p>
                      <p>
                        <span className="font-bold text-brand-blue">The Solution:</span> AICOD carried out initiatives training on financial literacy, business plan development, bookkeeping, and technology integration.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-6 flex items-center gap-2 text-brand-orange font-bold hover:text-brand-blue transition-colors group"
              >
                {isExpanded ? "Show Less" : "Read More about Our Approach"}
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-[-90deg]' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl group"
          >
            <Image
              src="/images/our-story/skills.png"
              alt="Livelihood Skills Development"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 bg-brand-yellow w-20 h-20 rounded-bl-[100px] z-10 opacity-90" />
          </motion.div>
        </div>

        {/* --- FEATURE: ONE TEAM --- */}
        <div className="bg-brand-blue rounded-[3rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl relative">
          {/* Decorative Background Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 relative aspect-video w-full overflow-hidden rounded-xl border-4 border-white/20 shadow-lg"
            >
              <Image
                src="/images/our-story/one-team.png"
                alt="One Team Initiative"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-brand-yellow"></div>
                <span className="text-brand-yellow text-xl" style={{ fontFamily: 'Monotype Corsiva' }}>Collective Action</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">One Team Initiative</h2>

              <div className="space-y-4 text-blue-100 text-lg leading-relaxed">
                <p>
                  An economic program designed to empower community members to generate their own economic resources.
                </p>
                <p>
                  A significant challenge has been lack of access to affordable financing. Our program helps communities leverage local resources to create sustainable opportunities.
                </p>
                <div className="bg-white/10 p-6 rounded-lg mt-6 border-l-4 border-brand-green backdrop-blur-sm">
                  <p className="font-bold text-white">Impact:</p>
                  <p className="text-sm">Over 100 households have collaborated to launch their own economic projects, attracting stakeholder support and improving lives.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}