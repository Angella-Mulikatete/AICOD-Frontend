import Image from 'next/image';
import { getPlaceholderImagesByPrefix } from '@/lib/image-assets';
import { CheckCircle } from 'lucide-react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Impact',
  description: 'Measuring our success by the positive changes we create together. See the impact AICOD has made in communities.',
};

export default function ImpactPage() {
  // Use getImageAssetsByPrefix to get an array of images
  const impactImages = getPlaceholderImagesByPrefix('impact-');

  const stats = [
    { value: '10,000+', label: 'Trees Planted' },
    { value: '500+', label: 'Families Supported' },
    { value: '25+', label: 'Communities Engaged' },
    { value: '1,200+', label: 'People Trained' },
  ] as const;

  const keyAchievements = [
    'Established 5 community-managed forests, protecting over 2,000 hectares of critical habitat.',
    'Provided legal aid to over 300 individuals in land rights disputes.',
    'Launched a successful women\'s cooperative for artisanal crafts, boosting household incomes by an average of 40%.',
    'Implemented environmental education programs in 15 local schools, reaching over 5,000 students.',
    'Facilitated the creation of 3 sustainable farming initiatives, improving food security for hundreds of families.'
  ] as const;

  return (
    <div className="animate-enter">
      <header className="bg-accent py-16 text-accent-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Impact</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-accent-foreground/80">
            Measuring our success by the positive changes we create together.
          </p>
        </div>
      </header>

      {/* Stats Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-headline text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-16">
          {/* Key Achievements */}
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary">Key Achievements</h2>
            <ul className="mt-6 space-y-4">
              {keyAchievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-lg text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4">
            {impactImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`overflow-hidden rounded-lg shadow-lg ${index === 0 ? 'col-span-2' : ''}`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  priority={index === 0}
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}