import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Page } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export default async function AboutUsPage() {
    let page: Page;

    try {
        const response = await api.getPage('about');
        page = response.data;
    } catch (error) {
        console.error('Failed to load About Us page:', error);
        // Fallback or 404
        notFound();
    }

    const heroImage = page.featured_image
        ? (page.featured_image.startsWith('http') ? page.featured_image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/storage/${page.featured_image}`)
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&h=600&fit=crop&q=80';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <Image
                    src={heroImage}
                    alt={page.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/80 to-brand-green/70 mix-blend-multiply" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">{page.title}</h1>
                    {page.excerpt && (
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">{page.excerpt}</p>
                    )}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div
                        className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </section>

            {/* Sections (if any) */}
            {page.sections && page.sections.length > 0 && (
                <div className="py-10 container mx-auto px-4 max-w-6xl">
                    {page.sections.map((section, idx) => (
                        <div key={section.id} className={`flex flex-col md:flex-row gap-12 items-center mb-24 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-brand-blue mb-4">{section.title}</h2>
                                <div
                                    className="prose prose-lg text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                />
                            </div>
                            {/* Placeholder for section image if API supported it in sections, currently sections is just title/content */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
