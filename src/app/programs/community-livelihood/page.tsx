'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { Users, Sprout, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function CommunityLivelihoodPage() {
  const heroImage = getPlaceholderImage('program-livelihood');

  const goals = [
    {
      title: "To build  community capacity on Sustainable Livelihoods",
      desc: "This is achived through offering training on sustainable agricultural practices, friendly environmentally and economic viable strategies, financial litracy training, market access and sustainlbe resource management.",
      icon: <Sprout className="w-8 h-8 text-white" />,
      bg: "bg-brand-green"
    },
    {
      title: "To inspire communities for sustainable Living standard",
      desc: "This is achived through implementing  initiatives that directly improve access to basic needs, such as clean water, education, and healthcare, thereby enhancing overall community welfare",
      icon: <Users className="w-8 h-8 text-white" />,
      bg: "bg-brand-orange"
    },
    {
      title: "To empower community for increased participation in Natural Resource governance",
      desc: "Advocate for inclusive participation of community members in decision-making processes concerning natural resource management, ensuring their voices and concerns are heard and addressed",
      icon: <Scale className="w-8 h-8 text-white" />,
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

      {/* --- 2. INTRO OVERVIEW (Full Width) --- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg md:prose-xl mx-auto text-gray-700"
          >
            <h2 className="text-3xl font-bold text-brand-blue mb-6">Program Overview</h2>
            <p className="leading-relaxed text-gray-600 text-lg text-justify">
              This Program aims to enhance the living standards of indigenous and host communities
              within the <span className="font-semibold text-brand-blue">Albertine region</span>,
              especially as it relates to natural resource sector developments. This initiative focuses on sustainable practices that empower communities to thrive frugally while respecting their cultural and environmental settings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 3. MAIN CONTENT SPLIT --- */}
      <div className="bg-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* === LEFT COLUMN: Goals & Conclusion (Span 7) === */}
            <div className="lg:col-span-7 space-y-16">

              {/* Strategic Goals Section */}
              <div className="space-y-8">
                <div className="border-l-4 border-brand-orange pl-4">
                  <h3 className="text-2xl font-bold text-brand-blue">Strategic Goals</h3>
                  <p className="text-gray-500 text-sm mt-1">Our key objectives for community development</p>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {goals.map((goal, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariant}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex gap-5 items-start"
                    >
                      <div className={`${goal.bg} w-12 h-12 rounded-lg flex flex-shrink-0 items-center justify-center mt-1 shadow-sm`}>
                        {goal.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{goal.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {goal.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* === RIGHT COLUMN: Sidebar (Span 5) === */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24 space-y-8">
                <ProgramMediaSidebar
                  images={sidebarImages}
                  youtubeUrl="https://www.youtube.com/watch?v=8Hc2iKu1nko"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

