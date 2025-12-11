'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProgramMediaSidebarProps {
    videoUrl?: string;
    videoPoster?: string;
    images?: string[];
    className?: string;
}

const defaultImages = [
    "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
];

export function ProgramMediaSidebar({
    videoUrl = "/assets/video/AICODV.mp4",
    videoPoster = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
    images = defaultImages,
    className = ""
}: ProgramMediaSidebarProps) {
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
            {/* 1. Video Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-black order-1"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                    poster={videoPoster}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </motion.div>

            {/* 2. Auto-scrolling Photos Section */}
            {/* On Tablet (md), this sits next to video. On Desktop (lg), it sits below. */}
            <div className="order-2 w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-56 md:h-auto md:aspect-video lg:h-64">
                
                {/* Mask gradients (Left/Right) */}
                <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

                <div className="flex h-full items-center">
                    <motion.div
                        className="flex gap-4 pr-4"
                        // We animate exactly the width of the original list so the loop is seamless
                        animate={{ x: [0, -oneCycleWidth] }} 
                        transition={{ 
                            repeat: Infinity, 
                            ease: "linear", 
                            duration: 25 // Slower duration for better viewing
                        }}
                    >
                        {/* 
                          Repeat images 4 times. 
                          This ensures that even on wide screens (before the loop resets), 
                          the user never sees empty space.
                        */}
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







