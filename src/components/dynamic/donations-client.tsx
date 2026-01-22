'use client';

import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart, Mail, Phone, User, DollarSign, MessageSquare, CheckCircle, Sparkles, Gift, Users, Target } from 'lucide-react';
import Image from 'next/image';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
    }
};

export function DonationsClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        amount: '',
        message: '',
        donation_type: 'monetary'
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.submitDonation({
                donor_name: formData.name,
                email: formData.email,
                phone: formData.phone,
                amount_proposed: formData.amount ? parseFloat(formData.amount) : undefined,
                purpose: formData.message,
                // donation_type map if needed, assuming backend handles string or specific enum
            });
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                phone: '',
                amount: '',
                message: '',
                donation_type: 'monetary'
            });
        } catch (err: any) {
            setError(err.message || 'Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const impactStats = [
        { icon: Users, value: '50K+', label: 'Lives Impacted', color: '#10b981' },
        { icon: Heart, value: '150+', label: 'Communities', color: '#ef4444' },
        { icon: Target, value: '75', label: 'Projects', color: '#3b82f6' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
            {/* Hero Section */}
            <motion.section
                className="relative bg-gradient-to-r from-brand-blue via-brand-green to-brand-blue py-24 text-white overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Animated particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
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
                                scale: [0, 1.5, 0],
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
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Gift className="w-20 h-20 text-brand-yellow" />
                            </motion.div>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
                            Support Our Work
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-50">
                            Your contribution makes a real difference in the lives of communities we serve
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Impact Stats */}
            <motion.section
                className="py-12 -mt-16 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        {impactStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-xl text-center"
                            >
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: stat.color }}
                                >
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                                    {stat.value}
                                </h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Main Content - Form + Info Side by Side */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Donation Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-brand-blue/10">
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-brand-blue">
                                    <Sparkles className="w-8 h-8 text-brand-yellow" />
                                    Make a Donation
                                </h2>

                                {submitted ? (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 0.5 }}
                                            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle className="w-16 h-16 text-green-600" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h3>
                                        <p className="text-gray-600 mb-6">
                                            Your donation request has been received. Our team will contact you shortly.
                                        </p>
                                        <Button
                                            onClick={() => setSubmitted(false)}
                                            className="bg-brand-blue hover:bg-brand-blue/90"
                                        >
                                            Make Another Donation
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Name */}
                                        <motion.div variants={fadeInUp}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Email */}
                                        <motion.div variants={fadeInUp}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Phone */}
                                        <motion.div variants={fadeInUp}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                                    placeholder="+256 700 000 000"
                                                />
                                            </div>
                                        </motion.div>

                                        {/* Donation Type */}
                                        <motion.div variants={fadeInUp}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Donation Type *
                                            </label>
                                            <select
                                                value={formData.donation_type}
                                                onChange={(e) => setFormData({ ...formData, donation_type: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                            >
                                                <option value="monetary">Monetary Donation</option>
                                                <option value="equipment">Equipment/Supplies</option>
                                                <option value="expertise">Professional Services</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                            </select>
                                        </motion.div>

                                        {/* Amount */}
                                        {formData.donation_type === 'monetary' && (
                                            <motion.div variants={fadeInUp}>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Amount (Optional)
                                                </label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="number"
                                                        value={formData.amount}
                                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                                                        placeholder="1000"
                                                    />
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Message */}
                                        <motion.div variants={fadeInUp}>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Message (Optional)
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <textarea
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    rows={4}
                                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                                                    placeholder="Tell us more about your donation..."
                                                />
                                            </div>
                                        </motion.div>

                                        {error && (
                                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                                                {error}
                                            </div>
                                        )}

                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full bg-gradient-to-r from-brand-orange to-brand-yellow text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                                />
                                            ) : (
                                                <>
                                                    <Heart className="w-5 h-5" />
                                                    Submit Donation Request
                                                </>
                                            )}
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="bg-gradient-to-br from-brand-blue to-brand-green text-white p-8 rounded-2xl shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Why Your Support Matters</h3>
                                <div className="space-y-4">
                                    {[
                                        'Empowers local communities to drive their own development',
                                        'Protects vital ecosystems for future generations',
                                        'Provides access to justice and human rights protection',
                                        'Creates sustainable livelihoods and economic opportunities'
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
                                            <p className="text-blue-50">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-xl">
                                <h3 className="text-2xl font-bold mb-4 text-brand-blue">Contact Us Directly</h3>
                                <div className="space-y-4 text-gray-700">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-brand-blue" />
                                        <a href="mailto:info@albertinecommunity.org" className="hover:text-brand-blue">
                                            info@albertinecommunity.org
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-brand-blue" />
                                        <a href="tel:+256123456789" className="hover:text-brand-blue">
                                            +256 123 456 789
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&q=80"
                                    alt="Community impact"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                                    <p className="text-white p-6 font-semibold text-lg">
                                        Together, we&apos;re building sustainable futures
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
