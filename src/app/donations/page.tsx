import { api } from '@/lib/api';
import { DonationsClient } from '@/components/dynamic/donations-client';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await api.getSeo('donations');
    const { title, description, keywords, og_image } = response.data;

    return {
      title,
      description,
      keywords: keywords?.split(','),
      openGraph: {
        title,
        description,
        images: og_image ? [og_image] : [],
      }
    };
  } catch (error) {
    return {
      title: 'Donate | AICOD',
      description: 'Support the work of the Albertine Institute for Community Development.',
    };
  }
}

export default function DonationsPage() {
  return <DonationsClient />;
}
