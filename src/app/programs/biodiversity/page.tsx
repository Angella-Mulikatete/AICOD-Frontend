// import Image from 'next/image';
// import { getPlaceholderImage } from '@/lib/image-assets';
// import { type Metadata } from 'next';
// import { CheckCircle } from 'lucide-react';

// export const metadata: Metadata = {
//   title: 'Biodiversity Program',
// };

// export default function BiodiversityPage() {

//   const heroImage = getPlaceholderImage('program-biodiversity');

//   const goals = [
//     "To empower community for the protection and participate in conservation efforts.",
//     "To advocate for implementation of both indigenous and science backed approaches for conservation.",
//     "To task duty bearrers to effectively manngagement of natural resurces for sustainable."
//   ];

//   return (
//     <div className="animate-enter">
//       {heroImage && (
//         <header className="relative h-[40vh] min-h-[300px] w-full text-primary-foreground">
//           <Image
//             src={heroImage.imageUrl}
//             alt={heroImage.description}
//             fill
//             className="object-cover"
//             data-ai-hint={heroImage.imageHint}
//           />
//           <div className="absolute inset-0 bg-primary/60" />
//           <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
//             <h1 className="font-headline text-4xl font-bold md:text-5xl">
//               Biodiversity and Environment
//             </h1>
//           </div>
//         </header>
//       )}

//       <div className="container mx-auto max-w-4xl px-4 py-16">
//         <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary">
//           <p className="lead">
//             The world faces a growing climate crisis, yet many global development projects compromises the environment. This pattern weakens the critical conservation efforts needed to protect global ecosystems and prevent further climate breakdown.
//           </p>
//           <p>
//             A compelling example of this conflict is the rapid growth of oil and gas projects within the sensitive Albertine Rift region. These developments pose serious threats to fragile ecosystems, fundamentally altering the environment and increasing the region’s climate vulnerability. The resulting environmental changes have severe consequences for local grassroots communities whose survival depends entirely on ecological stability and biodiversity.
//           </p>
//           <p>
//             Therefore, this programme aims to empower local grassroots communities by increasing their capacity, awareness, and ability to be resilient and informed about efforts to prevent, mitigate, and restore their environment.
//           </p>
//           <p>
//             This is achieved by advocating for responsible policies and effectively using existing laws to promote environmental conservation while directly addressing the various environmental challenges facing these communities.
//           </p>

//           <h3>The program Goals</h3>
//           <ul className="not-prose mt-6 list-none space-y-4 p-0">
//             {goals.map((goal, index) => (
//               <li key={index} className="flex items-start gap-3">
//                 <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
//                 <span className="text-lg">{goal}</span>
//               </li>
//             ))}
//           </ul>


//           <div className="mt-12 mb-8">
//             <h2 className="text-2xl font-bold text-brand-green mb-4">The Morther Earth Protection (MEP) Movement</h2>
//             <div className="grid md:grid-cols-2 gap-8 items-center">
//               <div>
//                 <p className="mb-4">
//                   The Mother Earth Protection (MEP) movement was founded to empower communities to fulfill their role as the &quot;original caretakers of Mother Earth.&quot; The MEP movement&apos;s strategy is built on four main components: Elder to Youth Knowledge Transfer, Protection of Reserve Areas, Innovative and Creative Solutions, and Community Training Programs.
//                 </p>
//                 <p>
//                   Each of these strategies aims to nurture, train, and mentor young Native leaders. The goal is to provide them with the opportunity to integrate traditional knowledge with the latest western technologies to create a powerful Earth management system. This system will protect, manage, and restore Mother Earth, ultimately returning harmony and balance to all people.
//                 </p>
//               </div>
//               <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
//                 <Image
//                   src="/images/our-story/mep.png"
//                   alt="Mother Earth Protection Movement"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </article>
//       </div>
//     </div>
//   );
// }









'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { CheckCircle, ChevronDown, ChevronUp, Leaf, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export default function BiodiversityPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Using placeholder logic from your snippet
  const heroImage = getPlaceholderImage('program-biodiversity');

  const goals = [
    "Empower communities to actively participate in protection and conservation efforts.",
    "Advocate for the implementation of both indigenous knowledge and science-backed approaches.",
    "Task duty bearers with the effective and sustainable management of natural resources."
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-foreground">

      {/* --- HERO SECTION --- */}
      {heroImage && (
        <header className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
          {/* Parallax-like Image Effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          </motion.div>

          {/* Brand Overlay: Using Brand Blue with opacity */}
          <div className="absolute inset-0 bg-[#26246D]/70" />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              {/* Monotype Corsiva Accent */}
              <span className="block text-brand-yellow text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Monotype Corsiva' }}>
                Preserving our Heritage
              </span>

              <h1 className="font-bold text-4xl md:text-6xl text-white shadow-sm max-w-4xl leading-tight">
                Biodiversity & <span className="text-brand-green">Environment</span>
              </h1>

              <div className="mt-6 w-24 h-1.5 bg-brand-orange rounded-full mx-auto" />
            </motion.div>
          </div>
        </header>
      )}

      <div className="container mx-auto max-w-5xl px-4 py-16 -mt-16 relative z-20">

        {/* --- MAIN ARTICLE CARD --- */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-t-8 border-brand-green"
        >
          {/* Lead Paragraph (Always Visible) */}
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl md:text-2xl leading-relaxed font-bold text-brand-blue mb-8">
              The world faces a growing climate crisis, yet many global development projects compromise the environment. This pattern weakens critical conservation efforts needed to protect ecosystems.
            </p>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="prose prose-lg max-w-none text-gray-600 space-y-6 pt-4">
                  <p>
                    A compelling example of this conflict is the rapid growth of oil and gas projects within the sensitive Albertine Rift region. These developments pose serious threats to fragile ecosystems, fundamentally altering the environment and increasing the region’s climate vulnerability.
                  </p>
                  <p>
                    The resulting environmental changes have severe consequences for local grassroots communities whose survival depends entirely on ecological stability and biodiversity.
                  </p>

                  {/* Decorative Quote using Brand Styles */}
                  <div className="my-8 pl-6 border-l-4 border-brand-orange bg-orange-50/50 p-6 rounded-r-lg">
                    <p className="text-2xl text-brand-blue" style={{ fontFamily: 'Monotype Corsiva' }}>
                      "Therefore, this programme aims to empower local grassroots communities by increasing their capacity, awareness, and ability to be resilient."
                    </p>
                  </div>

                  <p>
                    This is achieved by advocating for responsible policies and effectively using existing laws to promote environmental conservation while directly addressing the various environmental challenges facing these communities.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 px-8 py-3 rounded-full bg-brand-blue text-white hover:bg-[#1a194d] transition-all duration-300 font-bold shadow-lg hover:shadow-xl"
            >
              <span>{isExpanded ? "Show Less" : "Read Full Story"}</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-brand-green" />
              ) : (
                <ChevronDown className="w-5 h-5 text-brand-green group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </motion.article>

        {/* --- STRATEGIC GOALS SECTION --- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 border-b border-gray-200 pb-4">
            <div className="bg-brand-green/10 p-3 rounded-full w-fit">
              <Leaf className="text-brand-green w-8 h-8" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-brand-blue">Program Goals</h3>
              <p className="text-gray-500">Our commitment to a sustainable future</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-brand-green hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                <div className="mb-4">
                  <CheckCircle className="w-8 h-8 text-brand-orange group-hover:text-brand-green transition-colors duration-300" />
                </div>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {goal}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- MOTHER EARTH PROTECTION (MEP) SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 rounded-2xl overflow-hidden shadow-2xl bg-brand-blue text-white"
        >
          <div className="grid lg:grid-cols-2 gap-0">

            {/* Content Side */}
            <div className="p-8 md:p-14 flex flex-col justify-center relative">
              {/* Decorative Background Element */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-orange" />

              <div className="flex items-center gap-2 text-brand-green font-bold uppercase tracking-widest text-sm mb-4">
                <Globe className="w-4 h-4" />
                Global Movement
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                The Mother Earth Protection <br />
                <span className="text-brand-yellow" style={{ fontFamily: 'Monotype Corsiva', fontWeight: 'normal' }}>
                  (MEP) Movement
                </span>
              </h2>

              <div className="space-y-6 text-blue-100 leading-relaxed text-lg">
                <p>
                  Founded to empower communities to fulfill their role as the <span className="font-bold text-white">"original caretakers of Mother Earth,"</span> the MEP movement bridges the gap between ancient wisdom and modern action.
                </p>
                <p>
                  Our strategy is built on four pillars: Elder to Youth Knowledge Transfer, Protection of Reserve Areas, Innovative Solutions, and Community Training.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-brand-orange rounded-full"></div>
                  <p className="text-sm italic text-blue-200">
                    "Integrating traditional knowledge with western technologies to create a powerful Earth management system."
                  </p>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="relative h-[350px] lg:h-auto w-full group overflow-hidden">
              <Image
                src="/images/our-story/mep.png"
                alt="Mother Earth Protection Movement"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Green Overlay on Hover */}
              <div className="absolute inset-0 bg-brand-green/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}