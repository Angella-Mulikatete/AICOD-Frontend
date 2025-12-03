import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { type Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Human Rights Program',
};

export default function HumanRightsPage() {

  const heroImage = getPlaceholderImage('program-human-rights');

  const keyActivities = [
    'Providing free legal aid and counsel to marginalized community members.',
    'Conducting workshops and training sessions on human rights and civic duties.',
    'Advocating for policy changes to protect land rights and environmental justice.',
    'Monitoring and documenting human rights violations to hold authorities accountable.',
    'Empowering women and youth to participate in local governance and decision-making.'
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
              Human Rights
            </h1>
          </div>
        </header>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary">
          <p className="lead">
            At AICOD, we believe that sustainable development is impossible without social justice and the protection of fundamental human rights. Our Human Rights Program is committed to ensuring that every individual, especially the most vulnerable, can live with dignity, security, and equality.
          </p>

          <h2>Our Approach</h2>
          <p>
            We take a grassroots approach to human rights advocacy, working directly with communities to build their capacity to claim their rights. We focus on issues that are deeply intertwined with environmental and economic well-being, such as land rights, access to resources, and the right to a healthy environment.
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

          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold text-brand-green mb-4">Civic Development Agencies (CDA)</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  The host community in the Albertine development areas haven't been adequately involved in the development processes. This consistently violates their rights, breaking both national and international laws during development activities in the region.
                </p>
                <p>
                  To address this, AICOD established the Civic Development Agencies. This is a community-led movement which empowers communitity members to know, understand, and use the laws to demand, defend, and engage leaders, actors, and other relevant stakeholders for their interests and development agenda in these developments. These Agencies keep track of developments and set their own agendas, develop solutions, and bring the capacity, leadership, and resources to make those solutions a reality.
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/our-story/civic.png"
                  alt="Civic Development Agencies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <h2>Your Voice Matters</h2>
          <p>
            Protecting human rights is a collective effort. By supporting our work, you help give a voice to the voiceless and contribute to building a more just and equitable society. Learn how you can contribute to our advocacy and legal support programs.
          </p>
        </article>
      </div>
    </div>
  );
}
