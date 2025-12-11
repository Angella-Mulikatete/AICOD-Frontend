'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProgramMediaSidebarProps {
    videoUrl?: string; // Optional: Override default video
    videoPoster?: string;
    images?: string[]; // Images for the carousel
    className?: string;
}

const defaultImages = [
    "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop",
];

export function ProgramMediaSidebar({
    videoUrl = "/assets/video/aicod.mp4",
    videoPoster = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop",
    images = defaultImages,
    className = ""
}: ProgramMediaSidebarProps) {
    return (
        <div className={`flex flex-col gap-8 sticky top-24 ${className}`}>
            {/* 1. Video Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-black"
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
            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-64">
                {/* Mask gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

                <div className="flex h-full items-center">
                    <motion.div
                        className="flex gap-4 pr-4"
                        animate={{ x: [0, -600] }} // Adjust based on image widths - simpler specific implementation
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    >
                        {/* Repeat images 4 times to ensure smooth loop for various screen sizes */}
                        {[...images, ...images, ...images, ...images].map((imgUrl, i) => (
                            <div key={i} className="relative w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                                <Image
                                    src={imgUrl}
                                    alt="Program Activities"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
