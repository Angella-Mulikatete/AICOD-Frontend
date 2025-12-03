import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, HeartHandshake, Leaf, Users } from 'lucide-react';
import { getPlaceholderImage } from '@/lib/image-assets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {

  const storyImage = getPlaceholderImage('our-story-main');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[500px] w-full text-primary-foreground overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/images/hero-poster.jpg" // Placeholder poster
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl mb-6">
            AICOD Connect
          </h1>
          <p className="max-w-3xl text-lg md:text-2xl font-light leading-relaxed">
            &quot;Empowering and equipping the younger generation to defend their communities’ rights is crucial for sustainable change.&quot;
          </p>
          <Button asChild size="lg" className="mt-10 bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
            <Link href="/donations">
              Support Our Mission <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-3xl font-bold text-brand-green md:text-4xl">
                Welcome to The Albertine Institute For Community Development
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                AICOD is a non-governmental organization dedicated to creating sustainable and equitable communities. We believe in a world where nature and people thrive together. Our work is centered around three core pillars, ensuring a holistic approach to development.
              </p>
              <Button asChild variant="link" className="mt-4 px-0 text-lg text-accent">
                <Link href="/contact">
                  Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              {storyImage && (
                <Image
                  src={storyImage.imageUrl}
                  alt={storyImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={storyImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl font-bold text-brand-orange md:text-4xl">Our Core Programs</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We focus on key areas that are critical for sustainable development and community well-being.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="transform text-left transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <Leaf className="mb-4 h-12 w-12 text-accent" />
                <CardTitle className="font-headline text-2xl">Biodiversity</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Protecting and conserving our natural heritage for future generations through research and community engagement.
                </CardDescription>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/programs/biodiversity">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="transform text-left transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <HeartHandshake className="mb-4 h-12 w-12 text-accent" />
                <CardTitle className="font-headline text-2xl">Human Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advocating for justice, equality, and the protection of human rights for all members of the community.
                </CardDescription>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/programs/human-rights">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="transform text-left transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <Users className="mb-4 h-12 w-12 text-accent" />
                <CardTitle className="font-headline text-2xl">Community &amp; Livelihood</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Empowering communities with skills and resources to build sustainable livelihoods and foster economic growth.
                </CardDescription>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/programs/community-livelihood">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
