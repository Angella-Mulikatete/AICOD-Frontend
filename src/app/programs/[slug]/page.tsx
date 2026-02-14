'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { publicService } from '@/lib/api/services/public.service';
import { Program } from '@/lib/api/models';
import { CheckCircle, Leaf, Loader2, Shield, Users, Sprout, Goal } from 'lucide-react';
import { ProgramMediaSidebar } from '@/components/program-media-sidebar';
import { resolveImageUrl } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

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

// --- Program Specific Style Mapping ---
interface ProgramStyle {
    heroSubtitle: string;
    themeColor: string;
    goalsTitle: string;
    goalsIcon: any;
    layoutType: 'list' | 'cards';
    accentColor: string;
}

const styleMap: Record<string, ProgramStyle> = {
    'biodiversity': {
        heroSubtitle: 'Preserving our Heritage',
        themeColor: 'text-brand-green',
        goalsTitle: 'Program Goals',
        goalsIcon: Leaf,
        layoutType: 'list',
        accentColor: 'text-brand-orange'
    },
    'human-rights': {
        heroSubtitle: 'Equality & Justice',
        themeColor: 'text-white', // In the original HR page, the title was white/green mix
        goalsTitle: 'Strategic Goals',
        goalsIcon: Shield,
        layoutType: 'cards',
        accentColor: 'text-brand-blue'
    },
    'community-livelihood': {
        heroSubtitle: 'Empowering People',
        themeColor: 'text-brand-orange',
        goalsTitle: 'Strategic Goals',
        goalsIcon: Users,
        layoutType: 'cards',
        accentColor: 'text-brand-orange'
    }
};

const defaultStyle: ProgramStyle = {
    heroSubtitle: 'Holistic Development',
    themeColor: 'text-white',
    goalsTitle: 'Program Objectives',
    goalsIcon: Goal,
    layoutType: 'list',
    accentColor: 'text-brand-blue'
};

export default function ProgramDetailPage() {
    const { slug } = useParams();
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProgram() {
            if (!slug) return;
            try {
                const response = await publicService.getProgramBySlug(slug as string);
                if (response.success) {
                    setProgram(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch program details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProgram();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
            </div>
        );
    }

    if (!program) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <h1 className="text-4xl font-bold text-brand-blue mb-4">Program Not Found</h1>
                <p className="text-gray-600 mb-8">The program you are looking for does not exist or has been moved.</p>
                <a href="/programs" className="bg-brand-blue text-white px-6 py-2 rounded-full font-bold hover:bg-brand-blue/90 transition-colors">
                    Back to Programs
                </a>
            </div>
        );
    }

    const styles = styleMap[program.slug] || defaultStyle;
    const GoalsIcon = styles.goalsIcon;

    return (
        <div className="bg-white min-h-screen font-sans text-foreground">
            {/* --- HERO SECTION --- */}
            <header className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={resolveImageUrl(program.featured_image, '/assets/images/aicodlogo.png')}
                        alt={program.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />
                <div className="container mx-auto px-4 h-full">
                    <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            className="max-w-4xl"
                        >
                            <span className="block text-brand-yellow text-2xl md:text-3xl mb-2" style={{ fontFamily: "'Monotype Corsiva', cursive" }}>
                                {styles.heroSubtitle}
                            </span>

                            <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm leading-tight">
                                {program.title.split('&').map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && <span className="text-brand-yellow"> & </span>}
                                        <span className={i > 0 && program.slug !== 'human-rights' ? styles.themeColor : 'text-white'}>
                                            {i > 0 && program.slug === 'human-rights' ? <span className="text-brand-green">{part.trim()}</span> : part.trim()}
                                        </span>
                                    </span>
                                ))}
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

            <div className="container mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-brand-blue mb-4">Program Overview</h2>
                            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
                        </div>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none text-gray-700 prose-headings:text-brand-blue prose-h2:text-3xl prose-h3:text-2xl"
                        >
                            <div
                                className="text-gray-600 space-y-6"
                                dangerouslySetInnerHTML={{
                                    __html: program.content.replace(/<h2[^>]*>Program Overview<\/h2>/i, '')
                                }}
                            />
                        </motion.article>

                        {program.objectives && program.objectives.length > 0 && (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="pt-4"
                            >
                                <div className="space-y-4">

                                    {styles.layoutType === 'cards' ? (
                                        <div className="space-y-4">
                                            {program.objectives.map((goal, index) => {
                                                const parts = goal.split(' - ');
                                                const title = parts.length > 1 ? parts[0] : '';
                                                const description = parts.length > 1 ? parts[1] : goal;

                                                return (
                                                    <motion.div key={index} variants={cardVariant}>
                                                        <Card className="border-l-4 border-l-brand-orange shadow-sm hover:shadow-md transition-shadow">
                                                            <CardContent className="p-4 flex gap-4 items-start">
                                                                <div className="bg-brand-blue/5 p-2 rounded-full mt-1">
                                                                    <GoalsIcon className="w-5 h-5 text-brand-blue" />
                                                                </div>
                                                                <div>
                                                                    {title && <h4 className="font-bold text-brand-blue">{title}</h4>}
                                                                    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {program.objectives.map((goal, index) => (
                                                <motion.div
                                                    key={index}
                                                    variants={cardVariant}
                                                    whileHover={{ x: 5 }}
                                                    className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <CheckCircle className={`w-6 h-6 ${styles.accentColor} flex-shrink-0 mt-1`} />
                                                    <p className="text-gray-700 font-medium leading-relaxed">
                                                        {goal}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <ProgramMediaSidebar
                            youtubeUrl="https://www.youtube.com/watch?v=4oAtw0U3DJw"
                            images={program.gallery && program.gallery.length > 0 ? program.gallery : [program.featured_image]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
