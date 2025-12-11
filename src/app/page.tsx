'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, HeartHandshake, Leaf, Users, Target, Eye, ChevronRight, Mail, Globe, Building2, Handshake, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// --- Partners Data ---
const partners = [
  { name: "Global Green Fund", icon: Leaf },
  { name: "Human Rights Watch", icon: Globe },
  { name: "Civic Response", icon: Users },
  { name: "Govt of Uganda", icon: Building2 },
  { name: "Dev Partners Intl", icon: Handshake },
  { name: "Eco Systems", icon: Sprout },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.33, 1, 0.68, 1] as const }}
          className="absolute inset-0 -z-10"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
            poster="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2072&auto=format&fit=crop"
          >
            <source
              src="/assets/video/AICODV.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/60 to-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/10" />

        {/* --- CONTENT --- */}
        {/* ALIGNMENT FIX: Matching Header 'container mx-auto px-4' */}
        <div className="relative z-10 flex h-full flex-col justify-center container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >

            <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-xl">
              Welcome To <span className="text-brand-green">AICOD</span>
            </h1>

            <p className="text-lg md:text-2xl font-light text-blue-50 leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-md">
              Inspired by wonders
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button asChild size="lg" className="bg-brand-orange hover:bg-[#a04823] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent">
                <Link href="/our-story">
                  Our Story <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-blue text-lg px-8 py-6 rounded-full transition-all duration-300">
                <Link href="/programs/biodiversity">
                  Explore Programmes
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- WHO WE ARE + VISION & MISSION --- */}
      <section className="bg-white py-20 md:py-24">
        {/* ALIGNMENT FIX: Matching Header 'container mx-auto px-4' */}
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-16 md:grid-cols-2">

            {/* LEFT: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-24"
            >
              <h4 className="text-brand-green font-bold uppercase tracking-widest text-sm mb-3">Who We Are</h4>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-blue mb-6">
                Restoring Dignity & <br />
                <span className="text-brand-orange">Protecting Rights</span>
              </h2>

              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Founded in 2013, the Albertine Institute for Community Development (AICOD) emerged as a response to the pressing challenges faced by host communities in Uganda’s oil-rich Albertine region.
                </p>
                <p>
                  We are dedicated to ensuring that development does not come at the cost of human rights, engaging directly with those most affected to build a sustainable future.
                </p>
              </div>

              <Button asChild variant="link" className="text-brand-blue font-bold text-lg p-0 hover:text-brand-orange transition-colors">
                <Link href="/our-story" className="flex items-center gap-2">
                  Read Our Full History <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* RIGHT: Vision & Mission Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-8 relative"
            >
              {/* Decorative Background Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] bg-brand-blue/5 rounded-full blur-3xl -z-10" />

              {/* Vision Card */}
              <Card className="border-l-8 border-l-brand-blue shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-brand-blue/10 p-3 rounded-full">
                      <Eye className="w-8 h-8 text-brand-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-blue font-headline">Our Vision</h3>
                  </div>
                  <p className="text-xl text-gray-600 italic leading-relaxed pl-2 border-l-2 border-brand-yellow">
                    "A community with respected rights, improved livelihoods, and a safe, clean environment."
                  </p>
                </CardContent>
              </Card>

              {/* Mission Card */}
              <Card className="border-l-8 border-l-brand-green shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white ">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-brand-green/10 p-3 rounded-full">
                      <Target className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-green font-headline">Our Mission</h3>
                  </div>
                  <p className="text-xl text-gray-600 italic leading-relaxed pl-2 border-l-2 border-brand-yellow">
                    "To advocate for the promotion and protection of the rights of disadvantaged communities, thereby safeguarding their livelihoods."
                  </p>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>

{/* --- CORE PROGRAMS --- */}
      <section className="py-20 md:py-24 bg-slate-50">
        {/* ALIGNMENT FIX: Matching Header 'container mx-auto px-4' */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">Our Core Programmes</h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full mb-4" />
            <p className="max-w-2xl mx-auto text-lg text-gray-500">
              We focus on key areas that are critical for sustainable development and community well-being.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {/* Biodiversity */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group bg-white rounded-2xl overflow-hidden">
                <CardHeader>
                  {/* Added group-hover:text-white to the icon below */}
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-green transition-all duration-300">
                    <Leaf className="h-8 w-8 text-brand-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-brand-blue">Biodiversity & Environment </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Protecting and conserving our natural heritage for future generations through research.
                  </p>
                  <Button asChild variant="ghost" className="p-0 text-brand-green hover:bg-transparent hover:text-brand-blue font-bold text-base">
                    <Link href="/programs/biodiversity" className="flex items-center gap-2">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Human Rights */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group bg-white rounded-2xl overflow-hidden">
                <CardHeader>
                  {/* Added group-hover:text-white to the icon below */}
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-blue transition-all duration-300">
                    <HeartHandshake className="h-8 w-8 text-brand-blue group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-brand-blue">Human Rights & Inclusive Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Advocating for justice, equality, and the protection of human rights for all.
                  </p>
                  <Button asChild variant="ghost" className="p-0 text-brand-blue hover:bg-transparent hover:text-brand-orange font-bold text-base">
                    <Link href="/programs/human-rights" className="flex items-center gap-2">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Livelihoods */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group bg-white rounded-2xl overflow-hidden">
                <CardHeader>
                  {/* Added group-hover:text-white to the icon below */}
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-orange transition-all duration-300">
                    <Users className="h-8 w-8 text-brand-orange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-brand-blue">Community & Livelihoods </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Empowering communities with skills and resources to build sustainable livelihoods.
                  </p>
                  <Button asChild variant="ghost" className="p-0 text-brand-orange hover:bg-transparent hover:text-brand-blue font-bold text-base">
                    <Link href="/programs/community-livelihood" className="flex items-center gap-2">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PARTNERS CAROUSEL SECTION --- */}
      <section className="py-20 bg-white border-y border-slate-100 overflow-hidden">
        {/* ALIGNMENT FIX: Matching Header 'container mx-auto px-4' */}
        <div className="container mx-auto px-4 mb-12 text-center">
          <p className="text-sm font-bold text-brand-green uppercase tracking-widest">Our Strategic Partners</p>
          <h2 className="text-3xl font-bold text-brand-blue mt-2">Working Together for Change</h2>
        </div>

        {/* Infinite Slider */}
        <div className="relative w-full flex">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex gap-16 md:gap-24 whitespace-nowrap pl-16"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div key={index} className="flex flex-col items-center gap-3 group cursor-default opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div className="p-4 bg-slate-50 rounded-full border border-slate-100 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 transition-all">
                  <partner.icon className="w-10 h-10 text-gray-400 group-hover:text-brand-blue transition-colors" />
                </div>
                <span className="font-bold text-lg text-gray-400 group-hover:text-brand-blue transition-colors">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT CTA --- */}
      <section className="py-20 bg-slate-50">
        {/* ALIGNMENT FIX: Matching Header 'container mx-auto px-4' */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
          >
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/images/cta-bg.png"
                alt="Join us in making a difference"
                fill
                className="object-cover"
              />
              {/* Dark overlay for better text contrast on mobile */}
              <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
              {/* Gradient overlay for additional depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-[1]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 z-[1]"></div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Make a Difference?</h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
              Whether you want to partner with us, support our cause, or simply learn more about our work in the Albertine region, we would love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 relative z-10">
              <Button asChild size="lg" className="bg-white text-brand-orange hover:bg-brand-yellow hover:text-brand-blue font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-colors">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full bg-transparent">
                <Link href="/our-story" className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" /> Read Our Story
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

