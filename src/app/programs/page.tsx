import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Our Programs',
  description: 'Discover AICOD\'s programs transforming communities across Africa',
};

export default async function ProgramsPage() {
  let programs = [];
  let categories = [];

  try {
    const [programsResponse, categoriesResponse] = await Promise.all([
      api.getPrograms(),
      api.getProgramCategories()
    ]);

    programs = programsResponse.data || [];
    categories = categoriesResponse.data || [];
  } catch (error) {
    console.error('Failed to load programs:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-blue py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Programs</h1>
          <p className="max-w-2xl mx-auto mt-4 text-blue-100">
            Holistic approaches to sustainable development
          </p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: category.color || '#3B82F6' }}
                    >
                      {category.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.programs_count} programs</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {program.featured_image && (
                  <div className="relative h-48">
                    <Image
                      src={getMediaUrl(program.featured_image)}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {program.category && (
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ backgroundColor: program.category.color || '#3B82F6' }}
                    >
                      {program.category.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  {program.target_beneficiaries && (
                    <p className="text-sm text-gray-500 mb-4">
                      Target Beneficiaries: {program.target_beneficiaries.toLocaleString()}
                    </p>
                  )}
                  <Link
                    href={`/programs/${program.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {programs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No programs available at this time.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}