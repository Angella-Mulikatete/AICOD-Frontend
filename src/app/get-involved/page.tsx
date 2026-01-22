import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Page } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, Calendar } from 'lucide-react';

export const revalidate = 3600;

export default async function GetInvolvedPage() {
    let page: Page;

    try {
        const response = await api.getPage('get-involved');
        page = response.data;
    } catch (error) {
        console.error('Failed to load Get Involved page:', error);
        notFound();
    }

    const heroImage = page.featured_image
        ? (page.featured_image.startsWith('http') ? page.featured_image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/storage/${page.featured_image}`)
        : 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop&q=80';

    return (
        <div className="min-h-screen bg-white">
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt={page.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/80 to-brand-green/70 mix-blend-multiply" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">{page.title}</h1>
                    {page.excerpt && (
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">{page.excerpt}</p>
                    )}
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div
                        className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed text-center mb-16"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />

                    {/* Interactive Cards */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-brand-orange text-center">
                            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="w-8 h-8 text-brand-orange" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Donate</h3>
                            <p className="text-gray-600 mb-6">Support our programs financially. Every contribution makes a difference.</p>
                            <Button asChild className="w-full bg-brand-orange hover:bg-brand-orange/90">
                                <Link href="/donations">Donate Now</Link>
                            </Button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-brand-blue text-center">
                            <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Users className="w-8 h-8 text-brand-blue" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
                            <p className="text-gray-600 mb-6">Join our team of dedicated volunteers and work directly with communities.</p>
                            <Button asChild variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                                <Link href="/contact?subject=volunteer">Join Us</Link>
                            </Button>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-t-4 border-brand-green text-center">
                            <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="w-8 h-8 text-brand-green" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Partner</h3>
                            <p className="text-gray-600 mb-6">Collaborate with us to amplify impact. Become a corporate or organizational partner.</p>
                            <Button asChild variant="outline" className="w-full border-brand-green text-brand-green hover:bg-brand-green hover:text-white">
                                <Link href="/partners">Become a Partner</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
