import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { type Metadata } from 'next'
import { storyContent, type Section } from './data';

export const metadata: Metadata = {
  title: 'Our Story',
}

function SectionRenderer({ section, className = "", level = 2 }: { section: Section; className?: string; level?: number }) {
  const HeadingTag = level === 2 ? 'h2' : 'h3';
  const headingSize = level === 2 ? 'text-3xl border-b pb-2' : 'text-2xl';
  const headingColor = level === 2 ? 'text-brand-blue' : 'text-brand-green';

  return (
    <div className={`mb-16 ${className}`}>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className={section.image ? "order-2 md:order-1" : "col-span-2"}>
          <HeadingTag className={`${headingSize} font-bold ${headingColor} mb-4`}>{section.title}</HeadingTag>
          <div className="space-y-4 text-lg text-foreground/80">
            {section.description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
          {section.goals && (
            <div className="mt-6 bg-muted p-6 rounded-lg">
              <h4 className="font-bold text-brand-blue mb-3">Goals</h4>
              <ul className="list-disc pl-5 space-y-2">
                {section.goals.map((goal, idx) => (
                  <li key={idx}>{goal}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {section.image && (
          <div className="order-1 md:order-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* Render Subsections */}
      {section.subSections && (
        <div className="mt-12 pl-4 border-l-2 border-muted">
          {section.subSections.map((sub, idx) => (
            <SectionRenderer key={idx} section={sub} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OurStoryPage() {
  const storyImage = getPlaceholderImage('our-story-main');

  return (
    <div className="animate-enter">
      <header className="bg-brand-orange py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">{storyContent.history.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Empowering communities, protecting nature, and restoring dignity.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        {/* History Section */}
        <article className="prose prose-lg max-w-none text-foreground prose-headings:font-headline prose-headings:text-brand-green mb-16">
          {storyContent.history.content.map((para, idx) => (
            <p key={idx} className={idx === 0 ? "lead" : ""}>{para}</p>
          ))}

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
        </article>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-brand-blue/5 p-8 rounded-xl border-l-4 border-brand-blue">
            <h2 className="text-3xl font-bold text-brand-blue mb-4">Vision</h2>
            <p className="text-xl italic">"{storyContent.vision}"</p>
          </div>
          <div className="bg-brand-green/5 p-8 rounded-xl border-l-4 border-brand-green">
            <h2 className="text-3xl font-bold text-brand-green mb-4">Mission</h2>
            <p className="text-xl italic">"{storyContent.mission}"</p>
          </div>
        </div>

        {/* Programmes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-brand-blue mb-8 border-b pb-2">Programmes</h2>
          {storyContent.programmes.map((prog, idx) => (
            <SectionRenderer key={idx} section={prog} />
          ))}
        </section>

        {/* Conclusion */}
        <div className="bg-brand-orange/5 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold text-brand-orange mb-4">Conclusion</h3>
          <p className="text-lg">
            By integrating human rights advocacy with community development initiatives, this comprehensive program seeks to ensure that host communities are not only aware of their rights but actively engaged in the sustainable development processes that affect their lives. Through empowerment, advocacy, and supports for sustainable livelihoods, we aim to foster a just and equitable environment where all community members can thrive.
          </p>
        </div>

      </div>
    </div>
  );
}
