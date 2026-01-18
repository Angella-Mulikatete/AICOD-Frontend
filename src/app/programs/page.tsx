'use client';

import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles, MapPin, Users, Calendar } from 'lucide-react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  }
};

const categoryVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
};

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      api.getPrograms(),
      api.getProgramCategories()
    ]).then(([programsRes, categoriesRes]) => {
      setPrograms(programsRes.data || []);
      setCategories(categoriesRes.data || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const defaultImages = [
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80',
  ];

  const filteredPrograms = selectedCategory
    ? programs.filter(p => p.category_id === selectedCategory)
    : programs;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-green">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue bg-[length:200%_100%] py-24 text-center text-white overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-yellow to-white">
              Our Programs
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-blue-50 mb-8"
          >
            Transforming communities through sustainable development
          </motion.p>
          <motion.div
            className="flex justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 rounded-full bg-brand-yellow"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Categories with Animation */}
      {categories.length > 0 && (
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4">
            <motion.div variants={categoryVariants} className="text-center mb-12">
              <h2 className="text-4xl font-bold text-brand-blue mb-4 flex items-center justify-center gap-3">
                <Sparkles className="w-8 h-8 text-brand-yellow animate-pulse" />
                Program Categories
                <Sparkles className="w-8 h-8 text-brand-yellow animate-pulse" />
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our diverse range of initiatives making a difference
              </p>
            </motion.div>

            <div className="flex justify-center mb-8 flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-full font-semibold transition-all shadow-lg ${selectedCategory === null
                  ? 'bg-brand-blue text-white shadow-brand-blue/50'
                  : 'bg-white text-gray-700 hover:shadow-xl'
                  }`}
              >
                All Programs ({programs.length})
              </motion.button>
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all shadow-lg ${selectedCategory === category.id
                    ? 'text-white shadow-2xl'
                    : 'bg-white text-gray-700 hover:shadow-xl'
                    }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? category.color : undefined,
                  }}
                >
                  {category.name} ({programs.filter(p => p.category_id === category.id).length})
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Programs Grid with Stagger Animation */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                variants={cardVariants}
                layout
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-brand-blue hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Image with Overlay */}
                  <div className="relative h-56 bg-gradient-to-br from-brand-blue to-brand-green overflow-hidden group">
                    <Image
                      src={defaultImages[index % defaultImages.length]}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {program.is_featured && (
                      <motion.div
                        className="absolute top-4 right-4 bg-gradient-to-r from-brand-yellow to-brand-orange text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2"
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Sparkles className="w-4 h-4" />
                        Featured
                      </motion.div>
                    )}

                    {/* Category Badge */}
                    {program.category && (
                      <div
                        className="absolute bottom-4 left-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm"
                        style={{ backgroundColor: `${program.category.color}CC` }}
                      >
                        {program.category.name}
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-brand-blue transition-colors">
                      {program.title}
                    </h3>

                    {program.short_description && (
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {program.short_description}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      {program.impact_stats?.communities_engaged && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-sm text-brand-green font-semibold"
                        >
                          <Users className="w-4 h-4" />
                          {program.impact_stats.communities_engaged} communities engaged
                        </motion.div>
                      )}
                      {program.location && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <MapPin className="w-4 h-4" />
                          {program.location}
                        </motion.div>
                      )}
                      {program.start_date && (
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Calendar className="w-4 h-4" />
                          Since {new Date(program.start_date).getFullYear()}
                        </motion.div>
                      )}
                    </div>

                    <Link href={`/programs/${program.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-brand-blue to-brand-green text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                      >
                        Learn More
                        <motion.svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </motion.button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No programs in this category</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}