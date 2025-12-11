'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, Scale, Megaphone, Users2 } from 'lucide-react';
import { ProgramMediaSidebar } from '@/components/program-media-sidebar';

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

          <div className="container mx-auto px-4 h-full">
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
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
          </div>
        </header>
      )}

      <div className="container mx-auto px-4 py-16">
        {/* NEW LAYOUT: 2-Column Grid */}
        <div className="grid lg:grid-cols-12 gap-12">

          {/* --- LEFT COLUMN: CONTENT --- */}
          <div className="lg:col-span-7 space-y-12">

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none text-gray-700"
            >
              <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-6">
                The intersection of natural resource developments and human rights is a critical concern for host communities.
              </p>
              <p className="text-lg">
                Recognizing these issues, our program promotes human rights and inclusive development by empowering communities, working with key community groups, and building a system to protect their rights in the Albertine development areas.
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
                      className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative group hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-brand-blue w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-brand-orange transition-colors duration-300">
                          {goalIcons[index]}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-brand-blue mb-1">
                            {title}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {description ? description : goalString}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CDA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100"
            >
              <div className="relative h-64 w-full">
                <Image
                  src="/images/our-story/civic.png"
                  alt="Civic Development Agencies"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="text-brand-green w-4 h-4" />
                    <span className="text-brand-green font-bold uppercase tracking-wider text-xs">Community Led</span>
                  </div>
                  <h2 className="text-2xl font-bold">
                    Civic Development Agencies (CDA)
                  </h2>
                </div>
              </div>

              <div className="p-8">
                <div className="prose prose-lg text-gray-600 mb-6">
                  <p>
                    The host community in the Albertine development areas haven't been adequately involved in the development processes. This consistently violates their rights, breaking both national and international laws.
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    To address this, AICOD established the <span className="font-bold text-brand-orange">Civic Development Agencies</span>.
                  </p>
                  <p className="text-gray-700">
                    This is a community-led movement which empowers community members to know, understand, and use the laws to demand, defend, and engage leaders for their development agenda.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-brand-yellow shadow-sm italic text-gray-800 text-sm">
                    "These Agencies keep track of developments, set their own agendas, develop solutions, and bring the capacity to make those solutions a reality."
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: MEDIA SIDEBAR --- */}
          <div className="lg:col-span-5">
            <ProgramMediaSidebar
              images={[
                "/images/our-story/civic.png",
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop"
              ]}
            />
          </div>

        </div>
      </div>
    </div>
  );
}