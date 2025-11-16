import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { type Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Biodiversity Program',
};

export default function BiodiversityPage() {

  const heroImage = getPlaceholderImage('program-biodiversity');

  const keyActivities = [
    'Conducting ecological research and monitoring of key species and habitats.',
    'Implementing reforestation and habitat restoration projects in degraded areas.',
    'Working with local communities to establish sustainable land-use practices.',
    'Promoting anti-poaching initiatives and wildlife protection campaigns.',
    'Developing ecotourism projects that provide income for communities while preserving nature.'
  ];

  return (
    <div className="animate-enter">
      {heroImage && (
        <header className="relative h-[40vh] min-h-[300px] w-full text-primary-foreground">
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
          <div className="absolute inset-0 bg-primary/60" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="font-headline text-4xl font-bold md:text-5xl">
              Biodiversity Conservation
            </h1>
          </div>
        </header>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary">
          <p className="lead">
            The Albertine Rift is one of the most biodiverse regions on Earth, but it faces immense pressure from deforestation, climate change, and human activity. Our Biodiversity Program is dedicated to protecting this irreplaceable natural heritage for the well-being of both wildlife and people.
          </p>

          <h2>Our Approach</h2>
          <p>
            We believe that effective conservation must involve the people who live closest to and depend on these natural resources. Our approach is community-centric, combining scientific research with local knowledge to create conservation strategies that are both effective and sustainable. We work to create a future where humans and wildlife can coexist and thrive.
          </p>

          <h3>Key Activities</h3>
          <ul className="not-prose mt-6 list-none space-y-4 p-0">
              {keyActivities.map((activity, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-lg">{activity}</span>
                </li>
              ))}
          </ul>

          <h2>Get Involved</h2>
          <p>
            The protection of our planet's biodiversity is a shared responsibility. Whether through donations, volunteering, or spreading awareness, your support can make a significant difference. Join us in our mission to safeguard the natural wonders of the Albertine Rift.
          </p>
        </article>
      </div>
    </div>
  );
}
