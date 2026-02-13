'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Goal, Sprout, Shield, Users, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { contentService } from '@/lib/api/services/public.service';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const iconMap: Record<string, any> = {
  'Biodiversity': Sprout,
  'Human Rights': Shield,
  'Community Livelihoods': Users,
};

export default function ProgrammesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const response = await contentService.getHomepageData();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  const programs = data?.featured_programs || [];

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="bg-brand-blue py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-green/10 mix-blend-multiply" />
        <h1 className="text-4xl md:text-5xl font-bold relative z-10">Our Programmes</h1>
        <p className="max-w-xl mx-auto mt-4 text-blue-100 relative z-10">
          Holistic approaches to sustainable development.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-brand-blue mb-4">Our Approach</h2>
              <div className="w-20 h-1.5 bg-brand-orange rounded-full mb-6" />
              <p className="text-lg text-gray-700 leading-relaxed">
                At AICOD, our programmes are designed to address the interconnected challenges of environmental degradation, human rights violations, and poverty. We believe in a community-centered approach where local voices drive the agenda for sustainable change.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-brand-green mb-4 flex items-center gap-2">
                <Goal className="w-6 h-6" /> Key Goals
              </h3>
              <ul className="space-y-4">
                {programs.map((prog: any, idx: number) => (
                  <Link key={idx} href={`/programs/${prog.slug || prog.id}`}>
                    <Card className="border-l-4 border-l-brand-orange shadow-sm hover:shadow-md transition-shadow mb-4">
                      <CardContent className="p-4 flex gap-4 items-start">
                        <div className="bg-brand-blue/5 p-2 rounded-full mt-1">
                          {iconMap[prog.title] ?
                            iconMap[prog.title]({ className: "w-5 h-5 text-brand-blue" }) :
                            <Goal className="w-5 h-5 text-brand-blue" />
                          }
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-blue">{prog.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{prog.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8 sticky top-24">
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
                poster="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop"
              >
                <source src="/assets/video/aicod.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium">
                AICOD in Action
              </div>
            </motion.div>

            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-64">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

              <div className="flex h-full items-center">
                <motion.div
                  className="flex gap-4 pr-4"
                  animate={{ x: [0, -600] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                >
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="relative w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={`https://images.unsplash.com/photo-${1542601906990 + i}?q=80&w=2000&auto=format&fit=crop`}
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

        </div>
      </div>
    </div>
  )
}
