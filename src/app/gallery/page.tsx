'use client';

import { api } from '@/lib/api';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Camera, Image as ImageIcon, Calendar } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function GalleryPage() {
    const [albums, setAlbums] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getGalleryAlbums()
            .then(response => {
                setAlbums(response.data || []);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const defaultImages = [
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&h=600&fit=crop&q=80',
    ];

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
            {/* Hero */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue py-24 text-white overflow-hidden"
            >
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-brand-yellow rounded-full"
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

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center mb-6">
                            <Camera className="w-20 h-20 text-brand-yellow" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                            Our Gallery
                        </h1>
                        <p className="text-xl max-w-2xl mx-auto text-blue-50">
                            Capturing moments of impact and transformation
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Gallery Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {albums.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {albums.map((album, index) => (
                                <motion.div
                                    key={album.id}
                                    variants={fadeInUp}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                                >
                                    <div className="relative h-64">
                                        <Image
                                            src={defaultImages[index % defaultImages.length]}
                                            alt={album.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h3 className="text-white font-bold text-xl mb-2">{album.title}</h3>
                                            <div className="flex items-center gap-4 text-white/80 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <ImageIcon className="w-4 h-4" />
                                                    {album.photos_count || 0} photos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <Camera className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">Gallery Coming Soon</h3>
                            <p className="text-gray-500">We're uploading amazing photos. Check back soon!</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
