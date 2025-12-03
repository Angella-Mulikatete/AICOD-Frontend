'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, ChevronDown, ChevronUp, Scale, Megaphone, Users2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

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

export default function HumanRightsPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const heroImage = getPlaceholderImage('program-human-rights');

  // Icons mapped to the specific goals based on index
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

          {/* Brand Overlay: Blue with multiply blend for depth */}
          <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <span className="block text-brand-yellow text-2xl md:text-3xl mb-3" style={{ fontFamily: 'Monotype Corsiva' }}>
                Equality & Justice
              </span>

              <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm max-w-5xl leading-tight">
                Human Rights & <br className="hidden md:block" />
                <span className="text-brand-orange">Inclusive Development</span>
              </h1>

              <div className="mt-8 flex justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                <div className="w-3 h-3 rounded-full bg-brand-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
              </div>
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
          className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-b-8 border-brand-blue mb-20"
        >
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-6">
              The intersection of natural resource developments and human rights is a critical concern for host communities.
            </p>
            <p className="text-lg">
              Recognizing these issues, our program promotes human rights and inclusive development by empowering communities, working with key community groups, and building a system to protect their rights in the Albertine development areas.
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
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-2 bg-brand-green rounded-full"></div>
            <h3 className="text-3xl font-bold text-brand-blue">Strategic Goals</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {goals.map((goalString, index) => {
              // Helper to split title from description based on colon
              const [title, description] = goalString.split(':');

              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  {/* Top Color Bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-blue via-brand-green to-brand-yellow" />

                  <div className="bg-brand-blue w-12 h-12 rounded-lg flex items-center justify-center mb-6 shadow-md group-hover:bg-brand-orange transition-colors duration-300">
                    {goalIcons[index]}
                  </div>

                  <h4 className="text-lg font-bold text-brand-blue mb-3 min-h-[3.5rem]">
                    {title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description ? description : goalString}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* --- CIVIC DEVELOPMENT AGENCIES (CDA) SECTION --- */}
        <div className="bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2 gap-0">

            {/* Image Side - Order depends on mobile/desktop */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[300px] md:h-full w-full order-1 md:order-2 group"
            >
              <Image
                src="/images/our-story/civic.png"
                alt="Civic Development Agencies"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-blue/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-14 order-2 md:order-1 flex flex-col justify-center"
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="text-brand-green w-5 h-5" />
                <span className="text-brand-green font-bold uppercase tracking-wider text-sm">Community Led</span>
              </div>

              <h2 className="text-3xl font-bold text-brand-blue mb-6">
                Civic Development Agencies (CDA)
              </h2>

              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  The host community in the Albertine development areas haven't been adequately involved in the development processes. This consistently violates their rights, breaking both national and international laws.
                </p>

                {/* Collapsible Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4 space-y-4">
                        <p>
                          To address this, AICOD established the <span className="font-bold text-brand-orange">Civic Development Agencies</span>.
                        </p>
                        <p>
                          This is a community-led movement which empowers community members to know, understand, and use the laws to demand, defend, and engage leaders for their development agenda.
                        </p>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-brand-yellow shadow-sm italic text-gray-800">
                          "These Agencies keep track of developments, set their own agendas, develop solutions, and bring the capacity to make those solutions a reality."
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-6 flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-full font-bold hover:bg-brand-orange transition-all duration-300 shadow-md hover:shadow-lg group w-fit"
                >
                  <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  );
}