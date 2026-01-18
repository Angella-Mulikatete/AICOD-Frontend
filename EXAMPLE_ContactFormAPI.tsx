/**
 * EXAMPLE: API-Integrated Contact Form Component
 * 
 * This is a reusable contact form component that submits to the AICOD backend API.
 * 
 * Usage:
 * 1. Create this as src/components/ContactFormAPI.tsx
 * 2. Import and use it in your contact page
 * 3. Or update your existing contact form to use this pattern
 */

'use client';

import { useState, FormEvent } from 'react';
import { api, type ContactFormData } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContactFormAPI() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general',
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await api.submitContact(formData);
            setReferenceNumber(response.data.reference_number);
            setStatus('success');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                category: 'general',
            });

            // Auto-clear success message after 10 seconds
            setTimeout(() => setStatus('idle'), 10000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
            console.error('Contact form error:', error);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="John Doe"
                            disabled={status === 'loading'}
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="john@example.com"
                            disabled={status === 'loading'}
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="+256 700 000 000"
                            disabled={status === 'loading'}
                        />
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            disabled={status === 'loading'}
                        >
                            <option value="general">General Inquiry</option>
                            <option value="partnership">Partnership</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="complaint">Complaint</option>
                            <option value="suggestion">Suggestion</option>
                        </select>
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="subject"
                            type="text"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="How can we help you?"
                            disabled={status === 'loading'}
                        />
                    </div>

                    {/* Message Field */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Tell us more about your inquiry..."
                            disabled={status === 'loading'}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 text-lg font-semibold"
                    >
                        {status === 'loading' ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                    </Button>

                    {/* Success Message */}
                    {status === 'success' && (
                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-green-800">Message sent successfully!</p>
                                    <p className="text-sm text-green-700 mt-1">
                                        Reference Number: <span className="font-mono font-bold">{referenceNumber}</span>
                                    </p>
                                    <p className="text-sm text-green-600 mt-1">
                                        We'll get back to you as soon as possible.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {status === 'error' && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                            <div className="flex items-center">
                                <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-red-800">Failed to send message</p>
                                    <p className="text-sm text-red-700 mt-1">
                                        {errorMessage || 'Please check your connection and try again.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
