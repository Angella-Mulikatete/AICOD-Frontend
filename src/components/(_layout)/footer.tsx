'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Mail, MapPin, Phone, Send, Linkedin } from 'lucide-react';
import { navLinks } from '@/lib/nav-links';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { publicService } from '@/lib/api/services/public.service';
import { FooterData } from '@/lib/api/models';


const XIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153Zm-1.65 19.54h2.6l-11.287-16.1h-2.68l11.367 16.1Z" />
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await publicService.getFooter();
        if (response?.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch footer data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFooterData();
  }, []);

  const socialIconMap: Record<string, any> = {
    facebook: Facebook,
    twitter: XIcon,
    linkedin: Linkedin,
  };

  const contactIconMap: Record<string, any> = {
    email: Mail,
    phone: Phone,
    address: MapPin,
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Thank you for subscribing!');
        setEmail('');
      } else {
        if (data.alreadySubscribed) {
          toast.info(data.error);
        } else {
          toast.error(data.error || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-brand-blue text-white overflow-hidden shadow-2xl">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        <div className="py-12 md:py-16">
          <div className="grid gap-12 lg:grid-cols-12">

            <div className="lg:col-span-4">
              <Link href="/" className="inline-block group">
                <div className="mb-4">
                  <h1 className="text-4xl font-extrabold tracking-tight">
                    <span className="text-brand-green">A</span>
                    <span className="text-brand-orange">I</span>
                    <span className="text-white">COD</span>
                  </h1>
                </div>
              </Link>
              <p className="text-orange-50 mb-6 leading-relaxed text-sm">
                {data?.about_text || 'Albertine Institute For Community Development - Empowering communities through sustainable development, human rights advocacy, and environmental conservation.'}
              </p>
              <div className="flex gap-3 mb-8">
                {data ? (
                  data.social_media.map((social) => {
                    const Icon = socialIconMap[social.icon.toLowerCase()] || socialIconMap[social.platform.toLowerCase()] || Facebook;
                    return (
                      <a
                        key={social.platform}
                        href={social.url}
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                        aria-label={social.platform}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })
                ) : (
                  [
                    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100082838281335', icon: Facebook },
                    { name: 'X', href: 'https://twitter.com/aicodUg', icon: XIcon },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/104364202/admin/dashboard/', icon: Linkedin }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-blue flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      aria-label={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))
                )}
              </div>

              <div className="space-y-3">
                {data ? (
                  <>
                    <div className="flex items-start gap-3 text-sm text-orange-50">
                      <MapPin className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                      <span>{data.contact_info.address}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-orange-50">
                      <Mail className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                      <a href={`mailto:${data.contact_info.email}`} className="hover:text-brand-yellow transition-colors">{data.contact_info.email}</a>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-orange-50">
                      <Phone className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                      <a href={`tel:${data.contact_info.phone.replace(/\s+/g, '')}`} className="hover:text-brand-yellow transition-colors">{data.contact_info.phone}</a>
                    </div>
                  </>
                ) : (
                  [
                    { icon: MapPin, text: 'P.O Box 331 Hoima-Uganda' },
                    { icon: Mail, text: 'info@albertinecommunity.org', href: 'mailto:info@albertinecommunity.org' },
                    { icon: Phone, text: '+256 123 456 789', href: 'tel:+256123456789' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm text-orange-50">
                      <item.icon className="w-4 h-4 mt-0.5 text-brand-yellow flex-shrink-0" />
                      {item.href ? (
                        <a href={item.href} className="hover:text-brand-yellow transition-colors">{item.text}</a>
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">About</h3>
                  <ul className="space-y-3">
                    {data ? (
                      data.quick_links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.url} className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            {link.label}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li>
                          <Link href="/our-story" className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            Our Story
                          </Link>
                        </li>
                        <li>
                          <Link href="/cause" className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            Our Cause
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Programs */}
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Programmes</h3>
                  <ul className="space-y-3">
                    {data ? (
                      data.programs_links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.url} className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            {link.label}
                          </Link>
                        </li>
                      ))
                    ) : (
                      navLinks.find(l => l.title === 'Programmes')?.subLinks?.map(link => (
                        <li key={link.title}>
                          <Link href={link.href} className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            {link.title}
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h3>
                  <ul className="space-y-3">
                    {data ? (
                      data.legal_links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.url} className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            {link.label}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <>
                        <li>
                          <Link href="/donations" className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            Donations
                          </Link>
                        </li>
                        <li>
                          <Link href="/contact" className="text-orange-50 hover:text-brand-yellow transition-colors text-sm flex items-center gap-2 group">
                            <span className="w-1 h-1 rounded-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity" />
                            Contact Us
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-white mb-2 text-lg">Stay Updated</h3>
                <p className="text-orange-50 text-sm mb-4">
                  Subscribe to our newsletter by emailing us at <a href="mailto:info@albertinecommunity.org" className="text-brand-yellow hover:underline">info@albertinecommunity.org</a>
                </p>
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-200" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-orange-100 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-sm"
                      required
                    />
                  </div>
                  {/* Button kept as brand-green for high contrast against orange */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-medium py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        Subscribing...
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        Subscribe
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-orange-100">
            <p>
              {data?.copyright_text || `© ${new Date().getFullYear()} AICOD. All Rights Reserved.`}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}