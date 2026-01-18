import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function HomePage() {
  let homepageData;

  try {
    const response = await api.getHomepage();
    homepageData = response.data;
  } catch (error) {
    console.error('Failed to load homepage:', error);
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to AICOD</h1>
        <p className="mt-4">Empowering Communities, Transforming Lives</p>
      </div>
    );
  }

  const { hero, statistics, featured_programs, mission_section, vision_section, values_section, cta_section } = homepageData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {hero && (
        <section
          className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: hero.background_image ? `url(${getMediaUrl(hero.background_image)})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: hero.text_color || '#ffffff'
          }}
        >
          <div className="absolute inset-0 bg-black" style={{ opacity: hero.overlay_opacity || 0.5 }} />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                {hero.subtitle}
              </p>
            )}
            <div className="flex gap-4 justify-center flex-wrap">
              {hero.cta_primary_text && (
                <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                  <Link href={hero.cta_primary_link || '/programs'}>
                    {hero.cta_primary_text}
                  </Link>
                </Button>
              )}
              {hero.cta_secondary_text && (
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  <Link href={hero.cta_secondary_link || '/donations'}>
                    {hero.cta_secondary_text}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {statistics && statistics.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {statistics.map((stat) => (
                <div key={stat.id} className="text-center">
                  <h3
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color || '#1e40af' }}
                  >
                    {stat.formatted_value}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Programs Section */}
      {featured_programs && featured_programs.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured_programs.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                  <div className="p-6">
                    {program.category && (
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                        style={{ backgroundColor: program.category.color || '#3B82F6' }}
                      >
                        {program.category.name}
                      </span>
                    )}
                    <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
                    {program.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                    )}
                    <Link
                      href={`/programs/${program.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Mission, Vision & Values Section */}
      {(mission_section || vision_section || values_section) && (
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {mission_section && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  {mission_section.image && (
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={getMediaUrl(mission_section.image)}
                        alt={mission_section.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold mb-6 text-blue-600">{mission_section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: mission_section.content }}
                  />
                </div>
              )}
              {vision_section && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                  {vision_section.image && (
                    <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={getMediaUrl(vision_section.image)}
                        alt={vision_section.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="text-3xl font-bold mb-6 text-green-600">{vision_section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: vision_section.content }}
                  />
                </div>
              )}
              {values_section && (
                <div className="bg-white p-8 rounded-lg shadow-md md:col-span-2 lg:col-span-1">
                  <h2 className="text-3xl font-bold mb-6 text-purple-600">{values_section.title}</h2>
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: values_section.content }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta_section && (
        <section
          className="py-20 text-white text-center relative overflow-hidden"
          style={{
            backgroundColor: cta_section.background_color || '#2563eb'
          }}
        >
          {cta_section.background_image && (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getMediaUrl(cta_section.background_image)})` }}
              />
              <div className="absolute inset-0 bg-black opacity-60" />
            </>
          )}
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold mb-6">{cta_section.title}</h2>
            {cta_section.description && (
              <p className="text-xl mb-8 max-w-2xl mx-auto">{cta_section.description}</p>
            )}
            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
              <Link href={cta_section.button_link}>
                {cta_section.button_text}
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
