'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface ProgramMediaSidebarProps {
    youtubeUrl?: string;
    videoPoster?: string;
    images?: string[];
    className?: string;
}

const defaultImages = [
    "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
];

// Helper function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url: string): string => {
    // Handle different YouTube URL formats
    let videoId = '';

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1]?.split('&')[0] || '';
    }
    // Format: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    // Format: https://www.youtube.com/embed/VIDEO_ID (already embed format)
    else if (url.includes('embed/')) {
        return url; // Already in correct format
    }

    // Return embed URL if we found a video ID, otherwise return original
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export function ProgramMediaSidebar({
    youtubeUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoPoster = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
    images = defaultImages,
    className = ""
}: ProgramMediaSidebarProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

    // Calculate animation distance based on fixed card width (w-64 = 256px) + gap (gap-4 = 16px) = 272px
    // 3 images * 272px = 816px total width for one set
    const oneCycleWidth = images.length * 272;

    return (
        <div className={`
            grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col 
            gap-6 lg:gap-8 
            lg:sticky lg:top-24 
            w-full 
            ${className}
        `}>
            {/* 1. YouTube Video Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-black order-1"
            >
                {!isPlaying ? (
                    <>
                        {/* Poster Image */}
                        <Image
                            src={videoPoster}
                            alt="Video thumbnail"
                            fill
                            className="object-cover"
                        />

                        {/* Play Button Overlay */}
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group z-10"
                            aria-label="Play video"
                        >
                            <div className="w-20 h-20 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300 shadow-2xl">
                                <Play className="w-10 h-10 text-white ml-1" fill="white" />
                            </div>
                        </button>

                        {/* Label */}
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/10 z-10">
                            Click to Watch
                        </div>
                    </>
                ) : (
                    <>
                        {/* YouTube iframe */}
                        <iframe
                            src={`${embedUrl}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </>
                )}
            </motion.div>

            {/* 2. Auto-scrolling Photos Section */}
            <div className="order-2 w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-56 md:h-auto md:aspect-video lg:h-64">

                {/* Mask gradients (Left/Right) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

                <div className="flex h-full items-center">
                    <motion.div
                        className="flex gap-4 pr-4"
                        animate={{ x: [0, -oneCycleWidth] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 25
                        }}
                    >
                        {[...images, ...images, ...images, ...images].map((imgUrl, i) => (
                            <div
                                key={i}
                                className="relative w-64 h-40 lg:h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 shadow-sm"
                            >
                                <Image
                                    src={imgUrl}
                                    alt={`Program Activity ${i}`}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 256px, 33vw"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
