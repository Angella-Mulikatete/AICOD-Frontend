'use client';

import { api } from '@/lib/api';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function TeamPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTeam()
      .then(response => {
        setTeam(response.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const defaultAvatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
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
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Users className="w-20 h-20 text-brand-yellow" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              Our Team
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-blue-50">
              Dedicated professionals driving positive change
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {team.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative h-80">
                    <Image
                      src={defaultAvatars[index % defaultAvatars.length]}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-6 -mt-20 relative z-10">
                    <h3 className="text-white font-bold text-xl mb-1">{member.name}</h3>
                    <p className="text-brand-yellow font-semibold mb-4">{member.position}</p>
                    {member.bio && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-brand-blue hover:text-brand-green flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Contact</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Team Coming Soon</h3>
              <p className="text-gray-500">We're updating our team. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
