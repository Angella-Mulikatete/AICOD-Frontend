'use client';

import Image from 'next/image';
import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
import { CheckCircle, TrendingUp, Users, Sprout, School } from 'lucide-react';
import { motion } from 'framer-motion';

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function ImpactPage() {
  const impactImages = getPlaceholderImagesByPrefix('impact-');

  // Stats with specific brand colors assigned
  const stats = [
    { value: '10,000+', label: 'Trees Planted', color: 'text-brand-green', icon: Sprout },
    { value: '500+', label: 'Families Supported', color: 'text-brand-orange', icon: Users },
    { value: '25+', label: 'Communities Engaged', color: 'text-brand-blue', icon: TrendingUp },
    { value: '1,200+', label: 'People Trained', color: 'text-brand-yellow', icon: School },
  ];

  const keyAchievements = [
    'Established 5 community-managed forests, protecting over 2,000 hectares of critical habitat.',
    'Provided legal aid to over 300 individuals in land rights disputes.',
    'Launched a successful women\'s cooperative for artisanal crafts, boosting household incomes by an average of 40%.',
    'Implemented environmental education programs in 15 local schools, reaching over 5,000 students.',
    'Facilitated the creation of 3 sustainable farming initiatives, improving food security for hundreds of families.'
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative bg-brand-blue py-20 md:py-28 overflow-hidden text-white">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="block text-brand-yellow text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Monotype Corsiva' }}>
              Measuring Success
            </span>
            <h1 className="font-bold text-4xl md:text-6xl mb-6 shadow-sm">
              Our <span className="text-brand-green">Impact</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-blue-100 leading-relaxed">
              We define our success not just by numbers, but by the tangible, positive changes we create together with our communities.
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <section className="relative -mt-10 mb-16 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl p-6 text-center border-b-4 border-transparent hover:border-brand-blue transition-all duration-300"
              >
                <div className={`mx-auto w-12 h-12 mb-4 rounded-full bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Key Achievements List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-10 bg-brand-orange rounded-full"></div>
              <h2 className="text-3xl font-bold text-brand-blue">Key Achievements</h2>
            </div>

            <ul className="space-y-6">
              {keyAchievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-brand-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {achievement}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Quote Block */}
            <div className="mt-10 p-6 bg-brand-blue/5 rounded-lg border-l-4 border-brand-blue">
              <p className="text-brand-blue text-lg italic" style={{ fontFamily: 'Monotype Corsiva' }}>
                "Every tree planted and every family supported represents a step towards a sustainable future."
              </p>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            className="grid grid-cols-2 gap-4 auto-rows-[200px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {impactImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-xl shadow-lg group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}