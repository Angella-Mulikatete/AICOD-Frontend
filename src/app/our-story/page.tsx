import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story',
}

export default function OurStoryPage() {
 
  const storyImage = getPlaceholderImage('our-story-main');
  return (
    <div className="animate-enter">
      <header className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            From a simple idea to a driving force for community development.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-primary">
          <p className="lead">
            The Albertine Institute For Community Development (AICOD) was born from a shared vision among community leaders, environmentalists, and human rights advocates who recognized the interconnectedness of the challenges facing the Albertine Rift region.
          </p>
          
          {storyImage && (
            <div className="my-8">
              <Image
                src={storyImage.imageUrl}
                alt={storyImage.description}
                width={800}
                height={533}
                className="rounded-lg shadow-md"
                data-ai-hint={storyImage.imageHint}
              />
            </div>
          )}

          <h2>Our Mission</h2>
          <p>
            Our mission is to foster sustainable development by empowering communities to protect their environment, uphold human rights, and improve their livelihoods. We believe that lasting change comes from within the community, and we are committed to providing the tools, knowledge, and support necessary for people to build a better future for themselves.
          </p>
          
          <h2>Our Vision</h2>
          <p>
            We envision a thriving Albertine Rift where biodiversity is preserved, human rights are respected, and every community member has the opportunity to achieve their full potential. A future where ecological balance and social equity are not just ideals, but a lived reality.
          </p>

          <h2>Our Journey</h2>
          <p>
            Founded in [Year], AICOD started with a small team and a big dream. Our initial projects focused on reforestation and environmental education in a few select villages. The positive response and tangible impact fueled our growth. Over the years, we have expanded our scope to address the complex web of issues that affect our communities, from advocating for land rights to creating economic opportunities through sustainable agriculture and ecotourism.
          </p>
          <p>
            Today, AICOD is a recognized leader in community-led development, working with dozens of local and international partners to scale our impact. Our journey is a testament to the power of collaboration, perseverance, and a deep-rooted belief in the potential of people to create positive change.
          </p>
        </article>
      </div>
    </div>
  );
}
