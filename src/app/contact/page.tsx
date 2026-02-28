'use client';

import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone, Clock, ArrowRight, Loader2 } from 'lucide-react';
import MapWrapper from '@/components/ui/map-wrapper';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { publicService, contentService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { PublicPage, HeroSection, Company } from '@/lib/api/models';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState<Company | null>(null);
  const [hero, setHero] = useState<HeroSection | null>(null);
  const [page, setPage] = useState<PublicPage | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [compRes, heroRes, pageRes] = await Promise.all([
          publicService.getCompany(1).catch(() => ({ success: false, data: null })),
          contentService.getHeroByPage('contact').catch(() => ({ success: false, data: null })),
          publicService.getPageBySlug('contact').catch(() => ({ success: false, data: null }))
        ]);

        if (compRes.success) setCompany(compRes.data);
        if (heroRes.success) setHero(heroRes.data);
        if (pageRes.success) setPage(pageRes.data);
      } catch (error) {
        console.error('Failed to fetch contact data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
      </div>
    );
  }

  const contactDetails = [
    {
      icon: MapPin,
      label: "Visit Us",
      text: company?.address || "Hoima, Kikube",
      subtext: "Hoima district, Uganda",
      href: company?.google_maps_url || "#"
    },
    {
      icon: Mail,
      label: "Email Us",
      text: company?.contact_email || "info@albertinecommunity.org",
      subtext: "We reply within 24 hours",
      href: `mailto:${company?.contact_email || 'info@albertinecommunity.org'}`
    },
    {
      icon: Phone,
      label: "Call Us",
      text: company?.contact_phone || "+256 123 456 789",
      subtext: "Mon-Fri from 8am to 5pm",
      href: `tel:${company?.contact_phone}`
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">

      {/* --- HERO SECTION --- */}
      <header className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image Layer */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={resolveImageUrl(hero?.background_image, "/assets/images/contact-hero.png")}
            alt={hero?.title || "Get in touch with AICOD"}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-brand-green/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center pb-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="block text-brand-yellow text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Monotype Corsiva' }}>
              Connect with Us
            </span>
            <h1 className="font-bold text-4xl md:text-6xl text-white drop-shadow-lg mb-6">
              {hero?.title || 'Get in Touch'}
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-green-50 leading-relaxed">
              {hero?.subtitle || "We'd love to hear from you. Whether you have a question, feedback, or want to collaborate, please reach out."}
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- MAIN FLOATING CARD --- */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 -mt-24 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >

          {/* LEFT COLUMN: Contact Form */}
          <div className="flex-1 p-8 md:p-12 lg:p-16">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-brand-blue mb-2">
                {page?.title || 'Send us a Message'}
              </h2>
              <div className="h-1.5 w-16 bg-brand-yellow rounded-full mb-4" />
              <div
                className="text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: page?.content || 'Fill out the form below and our team will get back to you shortly.' }}
              />
            </div>

            <ContactForm />
          </div>

          {/* RIGHT COLUMN: Contact Info & Map */}
          <div className="lg:w-[450px] bg-brand-blue text-white p-8 md:p-12 flex flex-col relative overflow-hidden">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/images/contact-info-bg.png"
                alt="Contact background"
                fill
                className="object-cover opacity-30"
              />
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none z-[1]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none z-[1]" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                Contact Info
              </h3>

              {/* Contact Details List */}
              <div className="space-y-8 mb-12">
                {contactDetails.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="flex gap-4 group items-start"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange transition-colors duration-300">
                      <item.icon className="h-6 w-6 text-brand-yellow group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm text-brand-yellow font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="text-lg font-medium leading-none mb-1 group-hover:text-brand-orange transition-colors">{item.text}</p>
                      <p className="text-sm text-blue-200">{item.subtext}</p>
                    </div>
                  </motion.a>
                ))}
              </div>


              {/* Map Section */}
              <div className="flex-grow min-h-[250px] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white/10 relative">
                {/* Google Maps Preview Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/assets/images/map-preview.png"
                    alt="Google Maps preview"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Interactive Map Layer */}
                <div className="relative z-10">
                  <MapWrapper />
                </div>

                {/* Map Overlay Button */}
                <a
                  href={company?.google_maps_url || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white text-brand-blue px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-brand-orange hover:text-white transition-colors z-20"
                >
                  Open in Maps <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
