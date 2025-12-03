import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { type Metadata } from 'next';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community & Livelihood Program',
};

export default function CommunityLivelihoodPage() {
  const heroImage = getPlaceholderImage('program-livelihood');

  const keyActivities = [
    'Providing vocational training and skills development in areas like sustainable agriculture, beekeeping, and crafts.',
    'Establishing Village Savings and Loan Associations (VSLAs) to improve access to financial services.',
    'Supporting the development of small enterprises and connecting producers to markets.',
    'Promoting climate-resilient agricultural practices to ensure food security.',
    'Creating income-generating opportunities for women and youth through targeted programs.'
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
              Community &amp; Livelihood
            </h1>
          </div>
        </header>
      )}

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary">
          <p className="lead">
            Empowering communities to build resilient and prosperous futures is at the heart of our work. Our Community &amp; Livelihood program aims to create sustainable economic opportunities that improve quality of life while respecting the natural environment.
          </p>

          <h2>Our Approach</h2>
          <p>
            We partner with communities to identify their unique strengths and challenges. From there, we co-create solutions that build on local skills and resources. Our focus is on long-term sustainability, ensuring that the livelihoods we help build can thrive for generations to come, independent of external support.
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

          <div className="mt-12 space-y-12">
            {/* Innovative Livelihood Skills */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-brand-green mb-4">Innovative Livelihood Skills Development</h2>
                <p className="mb-4">
                  Empowering communities devastated by natural resource developments to restore and enrich their livelihoods. We achieve this by supporting native based approaches and creating movements capable of defending their rights, protecting their environment, and building an entrepreneurship culture.
                </p>
                <p>
                  In response to challenges like lost land and compensation mismanagement, AICOD carried out initiatives to strengthen capacity in financial and resource management. These included training on financial literacy, business plan development, bookkeeping, and technology integration.
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/our-story/skills.png"
                  alt="Livelihood Skills Development"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* One Team */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/our-story/one-team.png"
                  alt="One Team Initiative"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold text-brand-green mb-4">One Team</h2>
                <p className="mb-4">
                  Our initiative is an economic program designed to empower community members and build their capacity to generate their own economic resources. The goal is to address their livelihood needs directly.
                </p>
                <p>
                  A significant challenge for the community has been a lack of access to affordable financing. Our program helps them leverage local resources to create sustainable financial opportunities. So far, this initiative has brought together over 100 households to launch their own economic projects.
                </p>
              </div>
            </div>

            {/* Community Seed Bank */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-brand-green mb-4">The Community Seed Bank</h2>
                <p className="mb-4">
                  Community members have continually encountered significant impediments, primarily stemming from the lack of access to affordable and timely seeds, and vulnerability to climate induced stressors.
                </p>
                <p>
                  This initiative furnishes community members with access to affordable, timely, and climate-resilient seed varieties. By provisioning these hybrid seeds, the seed bank has demonstrably enhanced the community's food production and household incomes.
                </p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/our-story/livelihoods.png"
                  alt="Community Seed Bank"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <h2>Invest in People</h2>
          <p>
            When you support our Livelihood program, you are investing directly in the potential of individuals and families. Your contribution helps provide the training, tools, and initial capital needed to lift people out of poverty and create a ripple effect of prosperity throughout the community.
          </p>
        </article>
      </div>
    </div>
  );
}
