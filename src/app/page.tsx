import { api } from '@/lib/api';
import { HomeClient } from '@/components/dynamic/home-client';
import { Metadata } from 'next';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await api.getSeo('home');
    const { title, description, keywords, og_image, twitter_card } = response.data;

    return {
      title,
      description,
      keywords: keywords?.split(',').map(k => k.trim()),
      openGraph: {
        title,
        description,
        images: og_image ? [og_image] : [],
      },
      twitter: {
        card: (twitter_card as any) || 'summary_large_image',
        title,
        description,
        images: og_image ? [og_image] : [],
      },
    };
  } catch (error) {
    return {
      title: 'AICOD - Albertine Institute for Community Development',
      description: 'Empowering communities through sustainable development.',
    };
  }
}

export default async function HomePage() {
  let homepageData;

  try {
    const response = await api.getHomepage();
    homepageData = response.data;
  } catch (error) {
    console.error('Failed to load homepage data:', error);
    // You might want to return a fallback UI or error page here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Failed to load content. Please try again later.</h1>
      </div>
    )
  }

  return <HomeClient data={homepageData} />;
}
