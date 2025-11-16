import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  robots: {
    index: false,
    follow: false,
  }
}

export default function TeamPage() {
  const teamImage = PlaceHolderImages.find((img) => img.id === 'team-placeholder');

  return (
    <div className="animate-enter">
       <header className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Team</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Meet the passionate individuals behind AICOD.
          </p>
        </div>
      </header>
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
        <h2 className="text-center font-headline text-3xl font-bold text-primary">
          This Page is Currently Under Construction
        </h2>
        <p className="mt-4 max-w-xl text-center text-lg text-muted-foreground">
          We are working hard to bring you information about our dedicated team. Please check back soon!
        </p>
         {teamImage && (
            <div className="my-8 max-w-4xl w-full">
              <Image
                src={teamImage.imageUrl}
                alt={teamImage.description}
                width={1200}
                height={600}
                className="rounded-lg shadow-md aspect-video object-cover"
                data-ai-hint={teamImage.imageHint}
              />
            </div>
          )}
      </div>
    </div>
  );
}
