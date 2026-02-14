'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Loader2, MessageCircleQuestion } from 'lucide-react';
import { publicService } from '@/lib/api/services/public.service';
import { FAQ } from '@/lib/api/models';
import { cn } from '@/lib/utils';

export function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchFAQs() {
            try {
                const response = await publicService.getFAQs();
                if (response.success) {
                    setFaqs(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchFAQs();
    }, []);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-brand-blue" />
            </div>
        );
    }

    if (faqs.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 text-brand-blue mb-4">
                            <MessageCircleQuestion className="w-5 h-5" />
                            <span className="font-bold text-sm uppercase tracking-wider">Frequently Asked Questions</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-brand-blue mb-6">
                            Have Questions? <span className="text-brand-orange">We Have Answers</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-brand-yellow mx-auto rounded-full" />
                    </motion.div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={cn(
                                    "border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300",
                                    openId === faq.id ? "ring-2 ring-brand-blue/10 bg-slate-50 shadow-lg" : "hover:bg-slate-50 shadow-md"
                                )}
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full flex items-center justify-between p-6 text-left group"
                                >
                                    <span className={cn(
                                        "text-lg font-bold transition-colors duration-300",
                                        openId === faq.id ? "text-brand-blue" : "text-gray-700 group-hover:text-brand-blue"
                                    )}>
                                        {faq.question}
                                    </span>
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                        openId === faq.id ? "bg-brand-blue text-white rotate-180" : "bg-slate-100 text-slate-500 group-hover:bg-brand-blue group-hover:text-white"
                                    )}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openId === faq.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0">
                                                <div className="w-full h-px bg-slate-200 mb-6" />
                                                <div
                                                    className="prose prose-slate max-w-none text-gray-600 leading-relaxed text-justify prose-strong:text-brand-blue prose-li:marker:text-brand-orange"
                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
