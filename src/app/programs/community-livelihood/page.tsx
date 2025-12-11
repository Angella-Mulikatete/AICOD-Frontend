'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { Users, Sprout, HandCoins } from 'lucide-react';
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function CommunityLivelihoodPage() {
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

  const sidebarImages = [
    "/images/our-story/skills.png",
    "/images/our-story/one-team.png",
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
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
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />

          <div className="container mx-auto px-4 h-full">
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
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

            {/* Intro Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-6">
                This Program aims to enhance the living standards of indigenous and host communities within the Albertine region, especially as it relates to natural resource sector developments.
              </p>
              <p className="text-lg">
                This initiative focuses on sustainable practices that empower communities to thrive frugally while respecting their cultural and environmental settings.
              </p>
            </motion.div>

            {/* Goals Section */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-8 border-t border-gray-100"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-brand-blue mb-1">Program Goals</h3>
                <div className="w-12 h-1 bg-brand-yellow rounded-full"></div>
              </div>

              <div className="grid gap-6">
                {goals.map((goal, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariant}
                    whileHover={{ y: -5 }}
                    className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-brand-green hover:shadow-lg transition-all duration-300 group flex gap-4 items-start"
                  >
                    <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {goal.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-blue mb-2">{goal.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {goal.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Feature: Innovative Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-blue-50/50 rounded-2xl p-8 border-l-4 border-brand-green"
            >
              <h2 className="text-2xl font-bold text-brand-green mb-4">Innovative Livelihood Skills</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  Empowering communities devastated by natural resource developments to restore and enrich their livelihoods. We support native-based approaches and movements capable of defending rights and building an entrepreneurship culture.
                </p>
                <div className="space-y-4">
                  <p>
                    <span className="font-bold text-brand-blue">The Challenge:</span> Due to limited capacity in managing compensation monies from lost land, many community members became vulnerable to poverty.
                  </p>
                  <p>
                    <span className="font-bold text-brand-blue">The Solution:</span> AICOD carried out initiatives training on financial literacy, business plan development, bookkeeping, and technology integration.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature: One Team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-blue rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
            >
              {/* Decorative Background Circles */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-brand-yellow"></div>
                  <span className="text-brand-yellow text-lg" style={{ fontFamily: 'Monotype Corsiva' }}>Collective Action</span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-6">One Team Initiative</h2>

                <div className="space-y-4 text-blue-100 leading-relaxed">
                  <p>
                    An economic program designed to empower community members to generate their own economic resources.
                  </p>
                  <p>
                    A significant challenge has been lack of access to affordable financing. Our program helps communities leverage local resources to create sustainable opportunities.
                  </p>
                  <div className="bg-white/10 p-6 rounded-lg mt-6 border-l-4 border-brand-green backdrop-blur-sm">
                    <p className="font-bold text-white mb-1">Impact:</p>
                    <p className="text-sm">Over 100 households have collaborated to launch their own economic projects, attracting stakeholder support and improving lives.</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: MEDIA SIDEBAR --- */}
          <div className="lg:col-span-5">
            <ProgramMediaSidebar
              images={sidebarImages}
            />
          </div>

        </div>
      </div>
    </div>
  );
}