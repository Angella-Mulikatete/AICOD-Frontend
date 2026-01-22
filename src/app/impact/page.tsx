import { api } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Page } from '@/lib/api';

export const revalidate = 3600;

export default async function ImpactPage() {
    let page: Page;

    try {
        const response = await api.getPage('impact');
        page = response.data;
    } catch (error) {
        console.error('Failed to load Impact page:', error);
        notFound();
    }

    const heroImage = page.featured_image
        ? (page.featured_image.startsWith('http') ? page.featured_image : `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '')}/storage/${page.featured_image}`)
        : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop&q=80';

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
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl text-brand-yellow">{page.title}</h1>
                    {page.excerpt && (
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">{page.excerpt}</p>
                    )}
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div
                        className="prose prose-lg max-w-4xl mx-auto text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </section>
        </div>
    );
}
