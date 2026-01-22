'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { HomepageContent, getMediaUrl } from '@/lib/api';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 }
    }
};

interface HomeClientProps {
    data: HomepageContent;
}

export function HomeClient({ data }: HomeClientProps) {
    const { hero, statistics, featured_programs, mission_section, vision_section, values_section, cta_section } = data;

    const defaultImages = [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* HERO SECTION - with animated particles */}
            {hero && (
                <section className="relative h-screen flex items-center justify-center bg-cover bg-center overflow-hidden">
                    <Image
                        src={getMediaUrl(hero.background_image, 'hero')}
                        alt={hero.title}
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Animated dark overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-black via-brand-blue/50 to-black"
                    />

                    {/* Floating particles */}
                    <div className="absolute inset-0">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-brand-yellow rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -50, 0],
                                    x: [0, Math.random() * 20 - 10, 0],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1.5, 0],
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 3,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 container mx-auto px-4 text-center text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-2xl"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-yellow to-white">
                                    {hero.title}
                                </span>
                            </motion.h1>

                            {hero.subtitle && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl md:text-3xl mb-10 max-w-4xl mx-auto drop-shadow-lg text-gray-100"
                                >
                                    {hero.subtitle}
                                </motion.p>
                            )}

                            <motion.div
                                className="flex gap-4 justify-center flex-wrap"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button asChild size="lg" className="bg-gradient-to-r from-brand-orange to-brand-yellow hover:shadow-2xl text-white shadow-lg px-8 py-6 text-lg font-bold">
                                        <Link href={hero.cta_primary_link || '/programs'} className="flex items-center gap-2">
                                            <Sparkles className="w-5 h-5" />
                                            {hero.cta_primary_text || "Explore Programs"}
                                            <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 shadow-2xl px-8 py-6 text-lg font-bold">
                                        <Link href={hero.cta_secondary_link || '/donations'}>
                                            {hero.cta_secondary_text || "Support Us"}
                                        </Link>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                            <motion.div
                                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </section>
            )}

            {/* STATISTICS - with count-up animation */}
            {statistics && statistics.length > 0 && (
                <motion.section
                    className="py-20 bg-gradient-to-b from-gray-50 to-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                            {statistics.map((stat: any, index: number) => (
                                <motion.div
                                    key={index}
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.1, y: -10 }}
                                    className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                                >
                                    <motion.h3
                                        className="text-4xl md:text-5xl font-bold mb-2"
                                        style={{ color: stat.color || '#1e40af' }}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1, type: "spring" }}
                                    >
                                        {stat.formatted_value}
                                    </motion.h3>
                                    <p className="text-sm md:text-base text-gray-700 font-medium">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* FEATURED PROGRAMS */}
            {featured_programs && featured_programs.length > 0 && (
                <motion.section
                    className="py-20 bg-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="container mx-auto px-4">
                        <motion.div variants={fadeInUp} className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-green">
                                Our Programs
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Making a lasting impact through sustainable initiatives
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featured_programs.map((program: any, index: number) => (
                                <motion.div
                                    key={program.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -15, scale: 1.02 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
                                >
                                    <div className="relative h-56 overflow-hidden group">
                                        <Image
                                            src={program.featured_image ? getMediaUrl(program.featured_image, 'program') : defaultImages[index % defaultImages.length]}
                                            alt={program.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        {program.category && (
                                            <motion.div
                                                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
                                                style={{ backgroundColor: program.category.color }}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {program.category.name}
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold mb-3 text-gray-900">{program.title}</h3>
                                        {program.description && (
                                            <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                                        )}
                                        <motion.div whileHover={{ x: 5 }}>
                                            <Link
                                                href={`/programs/${program.slug}`}
                                                className="inline-flex items-center text-brand-blue hover:text-brand-green font-semibold group"
                                            >
                                                Learn More
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            variants={fadeInUp}
                            className="text-center mt-12"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button asChild size="lg" className="bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-lg hover:shadow-xl">
                                    <Link href="/programs">View All Programs</Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            )}

            {/* MISSION, VISION, VALUES */}
            {(mission_section || vision_section || values_section) && (
                <motion.section
                    className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mission_section && (
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-6 text-blue-600">{mission_section.title}</h2>
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: mission_section.content }}
                                    />
                                </motion.div>
                            )}

                            {vision_section && (
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                        <Award className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-6 text-green-600">{vision_section.title}</h2>
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: vision_section.content }}
                                    />
                                </motion.div>
                            )}

                            {values_section && (
                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all md:col-span-2 lg:col-span-1"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold mb-6 text-purple-600">{values_section.title}</h2>
                                    <div
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: values_section.content }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* CTA SECTION */}
            {cta_section && (
                <motion.section
                    className="py-24 text-white text-center relative overflow-hidden"
                    style={{ backgroundColor: cta_section.background_image ? undefined : '#2563eb' }} // Use BG color if image invalid?
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {cta_section.background_image && (
                        <Image src={getMediaUrl(cta_section.background_image, 'hero')} alt="CTA Background" fill className="object-cover absolute inset-0 z-0" />
                    )}
                    <div className={`absolute inset-0 ${cta_section.background_image ? 'bg-black/60' : 'bg-transparent'}`} />

                    {/* Animated background shapes */}
                    <motion.div
                        className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl z-1"
                        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -50, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl z-1"
                        animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, 50, 0] }}
                        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                    />

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.h2
                            className="text-5xl font-bold mb-6 drop-shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {cta_section.title}
                        </motion.h2>
                        {cta_section.description && (
                            <motion.p
                                className="text-2xl mb-10 max-w-2xl mx-auto opacity-90 drop-shadow-sm"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.9 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                {cta_section.description}
                            </motion.p>
                        )}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 shadow-2xl px-10 py-7 text-xl font-bold">
                                <Link href={cta_section.button_link} className="flex items-center gap-2">
                                    <Sparkles className="w-6 h-6" />
                                    {cta_section.button_text}
                                    <ArrowRight className="w-6 h-6" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.section>
            )}
        </div>
    );
}
