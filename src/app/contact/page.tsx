import { api } from '@/lib/api';
import { ContactClient } from '@/components/dynamic/contact-client';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await api.getSeo('contact');
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
      title: 'Contact Us | AICOD',
      description: 'Get in touch with the Albertine Institute for Community Development.',
    };
  }
}

export default function ContactPage() {
  return <ContactClient />;
}