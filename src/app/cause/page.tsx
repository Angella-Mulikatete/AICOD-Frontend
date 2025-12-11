'use client';

import Image from 'next/image';
import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
import { CheckCircle, TrendingUp, Users, Sprout, School } from 'lucide-react';
import { motion } from 'framer-motion';

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
          {/* Overlays for Text Readability */}
          <div className="absolute inset-0 bg-brand-orange/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* 2. Content Layer */}
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 text-center">
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
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
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
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">

          {/* LEFT COLUMN: Media (Video + Carousel) */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-24 order-2 lg:order-1 w-full">
            
            {/* 1. Responsive Video Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              // aspect-video enforces the 16:9 ratio regardless of screen width
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                // absolute inset-0 forces the video to fill the aspect-ratio container exactly
                className="absolute inset-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2000&auto=format&fit=crop"
              >
                <source src="/assets/video/aicod.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay Text */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/10 z-10">
                Impact Stories
              </div>
            </motion.div>

            {/* 2. Auto-scrolling Photos */}
            <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-slate-50 relative h-64">
              <div className="absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

              <div className="flex h-full items-center">
                <motion.div
                  className="flex gap-4 pr-4"
                  animate={{ x: [0, -600] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
                >
                  {/* Repeat images to ensure continuous loop */}
                  {[...impactImages, ...impactImages, ...impactImages].map((img, i) => (
                    <div key={i} className="relative w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 w-full"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-10 bg-brand-orange rounded-full"></div>
              <h2 className="text-3xl font-bold text-brand-blue">Key Achievements</h2>
            </div>

            <ul className="space-y-6">
              {keyAchievements.map((achievement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-1 bg-brand-green/10 p-1 rounded-full flex-shrink-0 group-hover:bg-brand-green transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-brand-green group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                    {achievement}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Quote Block */}
            <div className="mt-10 p-6 bg-brand-blue/5 rounded-lg border-l-4 border-brand-blue">
              <p className="text-brand-blue text-lg italic" style={{ fontFamily: 'Monotype Corsiva' }}>
                "Every tree planted and every family supported represents a step towards a sustainable future."
              </p>
            </div>

            <div className="mt-12">
              <p className="text-gray-500 text-sm">
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