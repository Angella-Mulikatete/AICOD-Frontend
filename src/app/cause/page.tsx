'use client';

import Image from 'next/image';
import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
import { CheckCircle, TrendingUp, Users, Sprout, School, Play, ChevronLeft, ChevronRight, GraduationCap, Globe, Trees, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { publicService } from '@/lib/api/services/public.service';
import { Statistic } from '@/lib/api/models';

// --- Data ---
const causesData = [
  {
    title: "Innovative Livelihood Skills Development",
    content: [
      "Empowered and Built community member’s capacity in Financial and Resource Management. During the development phases, where community members affected by oil and gas received compensation for their lost land to major oil and gas projects. Due to limited capacity and support to community in management and use of the compensation monies, this has led to most of native members to lose such resources which has rendered them more vulnerable to poverty and associated challenges.",
      "In response, AICOD carried out initiatives which aimed at strengthening their capacity in financial and resource management. These initiatives among included; training on financial literacy and management skills, business plan development, bookkeeping, technology integration among others."
    ],
    highlight: "Space for Three sliding/slow moving photos from Rwamutonga training with Sun Makers and a video with testimonies from the trained beneficiaries."
  },
  {
    title: "The Mother Earth Protection (MEP) Movement",
    content: [
      "The Mother Earth Protection (MEP) movement was founded to empower communities to fulfill their role as the \"original caretakers of Mother Earth.\"",
      "The MEP movement's strategy is built on four main components: Elder to Youth Knowledge Transfer, Protection of Reserve Areas, Innovative and Creative Solutions, and Community Training Programs.",
      "Each of these strategies aims to nurture, train, and mentor young Native leaders. The goal is to provide them with the opportunity to integrate traditional knowledge with the latest western technologies to create a powerful Earth management system. This system will protect, manage, and restore Mother Earth, ultimately returning harmony and balance to all people."
    ],
    highlight: "Three Photos from CFM work in Kaseeta and a video/short 1 minute documentary from the same group."
  },
  {
    title: "One Team",
    content: [
      "Our initiative is economic program designed to empower community members and build their capacity to generate their own economic resources. The goal is to address their livelihood needs directly.",
      "A significant challenge for the community has been a lack of access to affordable financing, despite their abundant local resources. Our program helps them leverage these resources to create sustainable financial opportunities.",
      "So far, this initiative has brought together over 100 households, who have collaborated to launch their own economic projects. This success has attracted support from various stakeholders, significantly improving the lives of community members."
    ],
    highlight: "space for three slow/sliding photos and a 1 Minute video."
  },
  {
    title: "Civic Development Agencies (CDA)",
    content: [
      "The host community in the Albertine development areas haven't been adequately involved in the development processes. This consistently violates their rights, breaking both national and international laws during development activities in the region.",
      "To address this, AICOD established the Civic Development Agencies. This is a community-led movement which empowers communitity members to know, understand, and use the laws to demand, defend, and engage leaders, actors, and other relevant stakeholders for their interests and development agenda in these developments.",
      "These Agencies keep track of developments and set their own agendas, develop solutions, and bring the capacity, leadership, and resources to make those solutions a reality."
    ],
    highlight: "Three slow/sliding Photos of Boreholes constructed due to community’s demand (Rwamutonga Borehole Photos will be used here) and a video about impact on our work."
  },
  {
    title: "The Community Seed Bank",
    content: [
      "The community members have continually encountered significant impediments, primarily stemming from the lack of access to affordable and timely seeds, vulnerability to diseases and pests attributable to substandard seed quality, and climate induced stressors.",
      "Furthermore, financial constraints hindering the timely procurement of quality seeds invariably lead to delayed planting, among other consequential issues.",
      "This initiative furnishes community members with access to affordable, timely, and climate-resilient seed varieties, including those capable of withstanding prolonged drought and diseases. By provisioning these hybrid seeds, the seed bank has demonstrably enhanced the community's food production and household incomes, thereby presenting a pragmatic solution to a global challenge."
    ],
    highlight: "Space for three sliding/slow motion moving photos and 1 Minute video."
  }
];

// --- Helper Function to Convert YouTube URL ---
function getYouTubeEmbedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('v')) {
      return `https://www.youtube.com/embed/${urlObj.searchParams.get('v')}`;
    }
    if (urlObj.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
    }
    return url;
  } catch (e) {
    return url;
  }
}

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

// --- Icon Mapping ---
const iconMap: Record<string, any> = {
  'tree': Trees,
  'users': Users,
  'globe': Globe,
  'academic-cap': GraduationCap,
};

export default function ImpactPage() {
  const impactImages = getPlaceholderImagesByPrefix('impact-');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [stats, setStats] = useState<Statistic[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, pageRes] = await Promise.all([
          publicService.getStatistics(),
          publicService.getPageBySlug('cause')
        ]);

        if (statsRes.success) setStats(statsRes.data);
        if (pageRes.success) setPageData(pageRes.data);
      } catch (error) {
        console.error('Failed to fetch cause page data:', error);
      } finally {
        setLoading(false);
        setLoadingStats(false);
      }
    }
    fetchData();
  }, []);

  // Use dynamic sections if available, otherwise fallback to empty
  const sections = pageData?.sections || [];
  const currentSection = sections[activePage];

  // Hero background from CMS or fallback
  const heroImage = pageData?.featured_image || "/assets/images/cause_hero.png";

  // Example YouTube URL
  const youtubeVideoUrl = 'https://www.youtube.com/watch?v=4oAtw0U3DJw';
  const embedUrl = getYouTubeEmbedUrl(youtubeVideoUrl);

  if (loading && !pageData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative py-20 md:py-32 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={pageData?.title || "Our Cause"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-brand-orange/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto max-w-4xl"
          >
            <span className="block text-brand-yellow text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Monotype Corsiva' }}>
              Driving Change
            </span>
            <h1 className="font-bold text-4xl md:text-6xl mb-6 shadow-sm drop-shadow-md">
              {pageData?.title || "Our Cause"}
            </h1>
            <p className="text-lg md:text-xl text-orange-50 leading-relaxed drop-shadow-sm">
              {pageData?.excerpt || "We define our success not just by numbers, but by the tangible, positive changes we create together with our communities."}
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <section className="relative -mt-10 mb-8 z-20">
        <div className="container mx-auto px-4">
          {loadingStats ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {stats.map((stat) => {
                const IconComponent = iconMap[stat.icon] || TrendingUp;
                return (
                  <motion.div
                    key={stat.id}
                    variants={scaleIn}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-xl p-4 text-center border-b-4 border-transparent hover:border-brand-orange transition-all duration-300"
                  >
                    <div
                      className="mx-auto w-10 h-10 mb-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}10`, color: stat.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <p
                      className="text-2xl md:text-3xl font-bold mb-1"
                      style={{ color: stat.color }}
                    >
                      {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                    </p>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* --- MAIN CONTENT (Sections) --- */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {sections.length > 0 ? (
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start min-h-[500px]"
            >
              <div className="w-full flex flex-col gap-8 order-1 lg:sticky lg:top-24">
                <div className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-black">
                  {!isVideoPlaying ? (
                    <>
                      <Image
                        src={currentSection?.background_image || "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop"}
                        alt={currentSection?.title || "Impact Story"}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => setIsVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group z-10"
                        aria-label="Play video"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300 shadow-2xl backdrop-blur-sm">
                          <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                        </div>
                      </button>
                    </>
                  ) : (
                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title="Impact Stories"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>

                <div className="w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-48 md:h-64">
                  <div className="flex h-full items-center">
                    <motion.div
                      className="flex gap-4 pr-4"
                      animate={{ x: [0, -600] }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    >
                      {[...impactImages, ...impactImages].map((img, i) => (
                        <div key={i} className="relative w-48 h-36 md:w-64 md:h-48 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                          <Image src={img.imageUrl} alt={img.description} fill className="object-cover" />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="w-full order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-8 md:h-10 bg-brand-orange rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-blue">{currentSection?.title}</h2>
                </div>

                <div
                  className="prose prose-lg max-w-none text-gray-600 leading-relaxed text-justify"
                  dangerouslySetInnerHTML={{ __html: currentSection?.content || '' }}
                />
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No impact stories found.</p>
            </div>
          )}

          {sections.length > 1 && (
            <div className="flex justify-center items-center gap-2 flex-wrap p-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setActivePage(prev => Math.max(0, prev - 1)); setIsVideoPlaying(false); }}
                disabled={activePage === 0}
                className="rounded-full w-10 h-10 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {sections.map((_, idx) => (
                <Button
                  key={idx}
                  variant={activePage === idx ? "default" : "outline"}
                  className={cn(
                    "rounded-full w-10 h-10 p-0 transition-all font-bold",
                    activePage === idx ? "bg-brand-blue text-white hover:bg-brand-orange" : "text-gray-500 hover:text-brand-orange"
                  )}
                  onClick={() => { setActivePage(idx); setIsVideoPlaying(false); }}
                >
                  {idx + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setActivePage(prev => Math.min(sections.length - 1, prev + 1)); setIsVideoPlaying(false); }}
                disabled={activePage === sections.length - 1}
                className="rounded-full w-10 h-10 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}