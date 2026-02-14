'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { publicService } from '@/lib/api/services/public.service';
import { Program } from '@/lib/api/models';
import { CheckCircle, Leaf, Loader2, Shield, Users, Goal, Check, Gavel, Megaphone, Scale } from 'lucide-react';
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
    goalsSubtext?: string;
    goalsIcon: any;
    layoutType: 'list' | 'cards';
    accentColor: string;
    showCenteredOverview: boolean;
    objectiveIcons?: any[];
    objectiveIconColors?: string[];
    goalsHeaderLayout?: 'top' | 'side';
    showGoalHeaderBar?: boolean;
}

const styleMap: Record<string, ProgramStyle> = {
    'biodiversity': {
        heroSubtitle: 'Preserving our Heritage',
        themeColor: 'text-brand-green',
        goalsTitle: 'Program Goals',
        goalsSubtext: 'Our commitment to a sustainable future',
        goalsIcon: Leaf,
        layoutType: 'list',
        accentColor: 'text-brand-orange',
        showCenteredOverview: false,
        goalsHeaderLayout: 'top'
    },
    'human-rights': {
        heroSubtitle: 'Equality & Justice',
        themeColor: 'text-brand-orange',
        goalsTitle: 'Strategic Goals',
        goalsIcon: Shield,
        layoutType: 'cards',
        accentColor: 'text-brand-blue',
        showCenteredOverview: false,
        objectiveIcons: [Gavel, Megaphone, Users],
        objectiveIconColors: ['bg-brand-blue/10 text-brand-blue', 'bg-brand-blue/10 text-brand-blue', 'bg-brand-blue/10 text-brand-blue'],
        goalsHeaderLayout: 'top',
        showGoalHeaderBar: true,
    },
    'community-livelihood': {
        heroSubtitle: 'Empowering People',
        themeColor: 'text-brand-orange',
        goalsTitle: 'Strategic Goals',
        goalsSubtext: 'Our key objectives for community development',
        goalsIcon: Users,
        layoutType: 'cards',
        accentColor: 'text-brand-orange',
        showCenteredOverview: true,
        objectiveIcons: [Leaf, Users, Scale],
        objectiveIconColors: ['bg-[#99CA3C] text-white', 'bg-[#F47920] text-white', 'bg-[#FFCD33] text-white'],
        goalsHeaderLayout: 'top',
        showGoalHeaderBar: true
    }
};

const defaultStyle: ProgramStyle = {
    heroSubtitle: 'Holistic Development',
    themeColor: 'text-white',
    goalsTitle: 'Program Objectives',
    goalsIcon: Goal,
    layoutType: 'list',
    accentColor: 'text-brand-blue',
    showCenteredOverview: false,
    goalsHeaderLayout: 'top'
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

    // Function to clean content of titles we render manually
    const cleanContent = (html: string) => {
        return html
            .replace(/<h2[^>]*>Program Overview<\/h2>/i, '')
            .replace(/<h3[^>]*>Program Goals<\/h3>/i, '')
            .replace(/<h3[^>]*>Strategic Goals<\/h3>/i, '')
            .replace(/<p>Our commitment to a sustainable future<\/p>/i, '')
            .replace(/<p>Our key objectives for community development<\/p>/i, '');
    };

    return (
        <div className="bg-white min-h-screen font-sans text-foreground">
            {/* --- HERO SECTION --- */}
            <header className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
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
                            <span className="block text-brand-yellow text-2xl md:text-3xl mb-4" style={{ fontFamily: "'Monotype Corsiva', cursive" }}>
                                {styles.heroSubtitle}
                            </span>

                            <h1 className="font-bold text-5xl md:text-7xl text-white shadow-sm leading-tight">
                                {program.title.split('&').map((part, i) => (
                                    <span key={i}>
                                        {i > 0 && <span className="text-white"> & </span>}
                                        <span className={i > 0 ? styles.themeColor : 'text-white'}>
                                            {part.trim()}
                                        </span>
                                    </span>
                                ))}
                            </h1>

                            <div className="mt-8 flex justify-center gap-2">
                                <div className="w-3.5 h-3.5 rounded-full bg-brand-green"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-brand-yellow"></div>
                                <div className="w-3.5 h-3.5 rounded-full bg-brand-orange"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                {/* --- CENTERED OVERVIEW (For Community & Livelihood) --- */}
                {styles.showCenteredOverview && (
                    <div className="max-w-4xl mx-auto mb-8 text-center space-y-8">
                        <div>
                            <h2 className="text-4xl font-bold text-brand-blue mb-4">Program Overview</h2>
                            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
                        </div>

                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="prose prose-xl max-w-none text-gray-700 prose-headings:text-brand-blue prose-p:text-xl prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-brand-orange/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-brand-blue"
                        >
                            <div
                                className="text-gray-600 space-y-10"
                                dangerouslySetInnerHTML={{
                                    __html: cleanContent(program.content).replace(/"([^"]*)"/g, '<blockquote>"$1"</blockquote>')
                                }}
                            />
                        </motion.article>
                    </div>
                )}

                {/* --- MAIN CONTENT GRID --- */}
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 space-y-10">

                        {/* Standard Overview (For Biodiversity & Human Rights) */}
                        {!styles.showCenteredOverview && (
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="prose prose-xl max-w-none text-gray-700 prose-headings:text-brand-blue prose-p:text-lg prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-brand-orange prose-blockquote:bg-brand-orange/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-brand-blue"
                            >
                                <div
                                    className="text-gray-600 space-y-8"
                                    dangerouslySetInnerHTML={{
                                        __html: cleanContent(program.content).replace(/"([^"]*)"/g, '<blockquote>"$1"</blockquote>')
                                    }}
                                />
                            </motion.article>
                        )}

                        {/* --- OBJECTIVES SECION --- */}
                        {program.objectives && program.objectives.length > 0 && (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="pt-4"
                            >
                                {/* Header for Top Layout */}
                                {styles.goalsHeaderLayout === 'top' && (
                                    <div className="flex flex-col gap-4 mb-12">
                                        <div className="flex items-center gap-4">
                                            {styles.showGoalHeaderBar ? (
                                                <div className="w-1.5 h-10 bg-brand-green rounded-full"></div>
                                            ) : (
                                                <div className="bg-brand-green/10 p-2.5 rounded-full">
                                                    <GoalsIcon className="text-brand-green w-7 h-7" />
                                                </div>
                                            )}
                                            <h3 className="text-3xl font-bold text-brand-blue leading-tight uppercase tracking-tight">{styles.goalsTitle}</h3>
                                        </div>
                                        {styles.goalsSubtext && (
                                            <p className="text-base text-gray-500 font-medium leading-relaxed">{styles.goalsSubtext}</p>
                                        )}
                                    </div>
                                )}

                                {/* Grid for Objectives */}
                                <div className={`grid ${styles.goalsHeaderLayout === 'side' ? 'grid-cols-1 md:grid-cols-12 gap-10' : 'grid-cols-1'}`}>
                                    {/* Side Header */}
                                    {styles.goalsHeaderLayout === 'side' && (
                                        <div className="md:col-span-4 lg:col-span-3 space-y-4 pt-2">
                                            <div className="flex items-center gap-3">
                                                {styles.showGoalHeaderBar && <div className="w-1.5 h-10 bg-brand-green rounded-full"></div>}
                                                <h3 className="text-3xl font-bold text-brand-blue leading-tight uppercase tracking-tight">{styles.goalsTitle}</h3>
                                            </div>
                                            {styles.goalsSubtext && (
                                                <p className="text-base text-gray-500 font-medium leading-relaxed max-w-[200px]">{styles.goalsSubtext}</p>
                                            )}
                                        </div>
                                    )}

                                    {/* Objective Items */}
                                    <div className={`${styles.goalsHeaderLayout === 'side' ? 'md:col-span-8 lg:col-span-9' : ''} space-y-6`}>
                                        {styles.layoutType === 'cards' ? (
                                            <div className="space-y-6">
                                                {program.objectives.map((goal, index) => {
                                                    const parts = goal.split(' - ');
                                                    const title = parts.length > 1 ? parts[0] : '';
                                                    const description = parts.length > 1 ? parts[1] : goal;

                                                    const ItemIcon = styles.objectiveIcons?.[index] || GoalsIcon;
                                                    const iconBgClass = styles.objectiveIconColors?.[index] || 'bg-brand-blue/10 text-brand-blue';

                                                    return (
                                                        <motion.div key={index} variants={cardVariant}>
                                                            <Card className="shadow-sm hover:shadow-lg transition-all group bg-white rounded-2xl overflow-hidden border-none border-gray-100">
                                                                <CardContent className="p-8 flex gap-8 items-start">
                                                                    <div className={`${iconBgClass} p-4 rounded-xl mt-1 shrink-0 transition-transform group-hover:scale-105`}>
                                                                        <ItemIcon className="w-7 h-7" />
                                                                    </div>
                                                                    <div className="space-y-3">
                                                                        {title && <h4 className="font-bold text-2xl text-brand-blue leading-tight">{title}</h4>}
                                                                        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                {program.objectives.map((goal, index) => (
                                                    <motion.div
                                                        key={index}
                                                        variants={cardVariant}
                                                        whileHover={{ x: 8 }}
                                                        className="flex gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                                                    >
                                                        <CheckCircle className={`w-8 h-8 ${styles.accentColor} flex-shrink-0 mt-0.5`} />
                                                        <p className="text-gray-700 text-lg font-medium leading-relaxed">
                                                            {goal}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="lg:col-span-5">
                        <div className={`sticky ${styles.showCenteredOverview ? 'top-24' : 'top-32'}`}>
                            <ProgramMediaSidebar
                                youtubeUrl="https://www.youtube.com/watch?v=4oAtw0U3DJw"
                                images={program.gallery && program.gallery.length > 0 ? program.gallery : [program.featured_image]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
