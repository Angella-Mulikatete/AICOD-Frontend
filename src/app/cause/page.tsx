'use client';

import Image from 'next/image';
import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
import { CheckCircle, TrendingUp, Users, Sprout, School, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

export default function ImpactPage() {
  const impactImages = getPlaceholderImagesByPrefix('impact-');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Example YouTube URL
  const youtubeVideoUrl = 'https://www.youtube.com/watch?v=4oAtw0U3DJw';
  const embedUrl = getYouTubeEmbedUrl(youtubeVideoUrl);

  const stats = [
    { value: '10,000+', label: 'Trees Planted', color: 'text-brand-green', icon: Sprout },
    { value: '500+', label: 'Families Supported', color: 'text-brand-orange', icon: Users },
    { value: '25+', label: 'Communities Engaged', color: 'text-brand-blue', icon: TrendingUp },
    { value: '1,200+', label: 'People Trained', color: 'text-brand-yellow', icon: School },
  ];

  const keyAchievements = [
    'Established 5 community-managed forests, protecting over 2,000 hectares of critical habitat.',
    'Provided legal aid to over 300 individuals in land rights disputes.',
    'Launched a successful women\'s cooperative for artisanal crafts, boosting household incomes by an average of 40%.',
    'Implemented environmental education programs in 15 local schools, reaching over 5,000 students.',
    'Facilitated the creation of 3 sustainable farming initiatives, improving food security for hundreds of families.'
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      <header className="relative py-20 md:py-32 overflow-hidden text-white">
        {/* 1. Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/cause_hero.png"
            alt="Impact Background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-brand-orange/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* 2. Content Layer */}
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
              Our <span className="text-white border-b-4 border-brand-blue">Cause</span>
            </h1>
            <p className="text-lg md:text-xl text-orange-50 leading-relaxed drop-shadow-sm">
              We define our success not just by numbers, but by the tangible, positive changes we create together with our communities.
            </p>
          </motion.div>
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <section className="relative -mt-10 mb-16 z-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl p-6 text-center border-b-4 border-transparent hover:border-brand-orange transition-all duration-300"
              >
                <div className={`mx-auto w-12 h-12 mb-4 rounded-full bg-gray-50 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT (Split Layout) --- */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Grid: 1 column on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT COLUMN: Media (Video + Carousel) */}
          {/* Order logic: Video shows first on mobile (order-1), Left on desktop */}
          <div className="w-full flex flex-col gap-8 order-1 lg:sticky lg:top-24">

            {/* 1. YouTube Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              // aspect-video ensures 16:9 ratio on ALL devices. w-full fills the container.
              className="relative w-full aspect-video rounded-xl md:rounded-2xl overflow-hidden shadow-xl bg-black"
            >
              {!isVideoPlaying ? (
                <>
                  {/* Poster Image */}
                  <Image
                    src="https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop"
                    alt="Impact Stories Video"
                    fill
                    className="object-cover"
                  />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 group z-10"
                    aria-label="Play video"
                  >
                    {/* Responsive play button size */}
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-orange transition-all duration-300 shadow-2xl backdrop-blur-sm">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                    </div>
                  </button>

                  {/* Overlay Text */}
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-white text-xs md:text-sm font-medium border border-white/10 z-10">
                    Impact Stories
                  </div>
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
            </motion.div>

            {/* 2. Auto-scrolling Photos */}
            {/* Added w-full to ensure it doesn't overflow horizontally on mobile */}
            <div className="w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-48 md:h-64">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

              <div className="flex h-full items-center">
                <motion.div
                  className="flex gap-4 pr-4"
                  animate={{ x: [0, -600] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                >
                  {[...impactImages, ...impactImages, ...impactImages].map((img, i) => (
                    // Responsive width for carousel items
                    <div key={i} className="relative w-48 h-36 md:w-64 md:h-48 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden bg-gray-200">
                      <Image
                        src={img.imageUrl}
                        alt={img.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>


          {/* RIGHT COLUMN: Key Achievements Text */}
          {/* Order-2 puts this below video on mobile, right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full order-2"
          >
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-1.5 h-8 md:h-10 bg-brand-orange rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-blue">Key Achievements</h2>
            </div>

            <ul className="space-y-4 md:space-y-6">
              {keyAchievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 md:gap-4 group"
                >
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                    <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-brand-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  {/* Responsive text size for readability on small screens */}
                  <span className="text-base md:text-lg text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {achievement}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Quote Block */}
            <div className="mt-8 md:mt-10 p-5 md:p-6 bg-brand-blue/5 rounded-xl border-l-4 border-brand-blue">
              <p className="text-brand-blue text-base md:text-lg italic leading-relaxed" style={{ fontFamily: 'Monotype Corsiva' }}>
                "Every tree planted and every family supported represents a step towards a sustainable future."
              </p>
            </div>

            <div className="mt-8 md:mt-12">
              <p className="text-gray-500 text-xs md:text-sm">
                * Figures are based on our 2024 Annual Report.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}












// 'use client';

// import Image from 'next/image';
// import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
// import { CheckCircle, TrendingUp, Users, Sprout, School } from 'lucide-react';
// import { motion } from 'framer-motion';

// // --- Animation Variants ---
// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] } }
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.15 }
//   }
// };

// const scaleIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
// };

// export default function ImpactPage() {
//   const impactImages = getPlaceholderImagesByPrefix('impact-');

//   // Stats with specific brand colors assigned
//   const stats = [
//     { value: '10,000+', label: 'Trees Planted', color: 'text-brand-green', icon: Sprout },
//     { value: '500+', label: 'Families Supported', color: 'text-brand-orange', icon: Users },
//     { value: '25+', label: 'Communities Engaged', color: 'text-brand-blue', icon: TrendingUp },
//     { value: '1,200+', label: 'People Trained', color: 'text-brand-yellow', icon: School },
//   ];

//   const keyAchievements = [
//     'Established 5 community-managed forests, protecting over 2,000 hectares of critical habitat.',
//     'Provided legal aid to over 300 individuals in land rights disputes.',
//     'Launched a successful women\'s cooperative for artisanal crafts, boosting household incomes by an average of 40%.',
//     'Implemented environmental education programs in 15 local schools, reaching over 5,000 students.',
//     'Facilitated the creation of 3 sustainable farming initiatives, improving food security for hundreds of families.'
//   ];

//   return (
//     <div className="bg-white min-h-screen font-sans text-foreground">

//       {/* --- HERO SECTION --- */}
//       <header className="relative bg-brand-orange py-20 md:py-28 overflow-hidden text-white">
//         {/* Decorative Background Elements */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

//         <div className="container mx-auto px-4 text-center relative z-10">
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//           >
//             <span className="block text-brand-yellow text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Monotype Corsiva' }}>
//               Driving Change
//             </span>
//             <h1 className="font-bold text-4xl md:text-6xl mb-6 shadow-sm">
//               Our <span className="text-brand-blue">Cause</span>
//             </h1>
//             <p className="mx-auto max-w-2xl text-lg md:text-xl text-orange-50 leading-relaxed">
//               We define our success not just by numbers, but by the tangible, positive changes we create together with our communities.
//             </p>
//           </motion.div>
//         </div>
//       </header>

//       {/* --- STATS SECTION --- */}
//       <section className="relative -mt-10 mb-16 z-20">
//         <div className="container mx-auto px-4">
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={stat.label}
//                 variants={scaleIn}
//                 whileHover={{ y: -5 }}
//                 className="bg-white rounded-xl shadow-xl p-6 text-center border-b-4 border-transparent hover:border-brand-orange transition-all duration-300"
//               >
//                 <div className={`mx-auto w-12 h-12 mb-4 rounded-full bg-gray-50 flex items-center justify-center ${stat.color}`}>
//                   <stat.icon className="w-6 h-6" />
//                 </div>
//                 <p className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
//                   {stat.value}
//                 </p>
//                 <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-500">
//                   {stat.label}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* --- MAIN CONTENT (Split Layout) --- */}
//       <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
//         <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">

//           {/* LEFT COLUMN: Media (Video + Carousel) - Mirror of Programmes */}
//           <div className="flex flex-col gap-8 sticky top-24 order-2 lg:order-1">
//             {/* 1. Video */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               className="rounded-2xl overflow-hidden shadow-xl aspect-video relative bg-black"
//             >
//               <video
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//                 className="h-full w-full object-cover"
//                 poster="https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop"
//               >
//                 <source src="/assets/video/aicod.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               {/* Overlay Text */}
//               <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg text-white text-sm font-medium">
//                 Impact Stories
//               </div>
//             </motion.div>

//             {/* 2. Auto-scrolling Photos */}
//             <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-64">
//               <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
//               <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

//               <div className="flex h-full items-center">
//                 <motion.div
//                   className="flex gap-4 pr-4"
//                   animate={{ x: [0, -600] }}
//                   transition={{ repeat: Infinity, ease: "linear", duration: 18 }} // Slightly different speed
//                 >
//                   {/* Repeat images */}
//                   {[...impactImages, ...impactImages, ...impactImages].map((img, i) => (
//                     <div key={i} className="relative w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden">
//                       <Image
//                         src={img.imageUrl}
//                         alt={img.description}
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </motion.div>
//               </div>
//             </div>
//           </div>


//           {/* RIGHT COLUMN: Key Achievements Text - Mirror of Programmes */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="order-1 lg:order-2"
//           >
//             <div className="flex items-center gap-3 mb-8">
//               <div className="w-1.5 h-10 bg-brand-orange rounded-full"></div>
//               <h2 className="text-3xl font-bold text-brand-blue">Key Achievements</h2>
//             </div>

//             <ul className="space-y-6">
//               {keyAchievements.map((achievement, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, x: 20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start gap-4 group"
//                 >
//                   <div className="mt-1 bg-brand-green/10 p-1 rounded-full flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
//                     <CheckCircle className="h-5 w-5 text-brand-green group-hover:text-white transition-colors duration-300" />
//                   </div>
//                   <span className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
//                     {achievement}
//                   </span>
//                 </motion.li>
//               ))}
//             </ul>

//             {/* Quote Block */}
//             <div className="mt-10 p-6 bg-brand-blue/5 rounded-lg border-l-4 border-brand-blue">
//               <p className="text-brand-blue text-lg italic" style={{ fontFamily: 'Monotype Corsiva' }}>
//                 "Every tree planted and every family supported represents a step towards a sustainable future."
//               </p>
//             </div>

//             <div className="mt-12">
//               <p className="text-gray-500 text-sm">
//                 * Figures are based on our 2024 Annual Report.
//               </p>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </div>
//   );
// }