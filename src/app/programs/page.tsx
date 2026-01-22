import { api } from '@/lib/api';
import { ProgramsClient } from '@/components/dynamic/programs-client';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  // Use a generic SEO for programs page as backend user guide said /seo/{page}
  // Let's assume 'programs' is the key
  try {
    const response = await api.getSeo('programs');
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
      title: 'Our Programs | AICOD',
      description: 'Explore our sustainable development initiatives and programs.',
    };
  }
}

export default async function ProgramsPage() {
  const [programsRes, categoriesRes] = await Promise.all([
    api.getPrograms(),
    api.getProgramCategories()
  ]);

  return (
    <ProgramsClient
      initialPrograms={programsRes.data || []}
      initialCategories={categoriesRes.data || []}
    />
  );
}