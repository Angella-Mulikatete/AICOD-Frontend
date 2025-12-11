import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';
import { type Metadata } from 'next';
import MapWrapper from '@/components/ui/map-wrapper';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AICOD. Contact us for questions, feedback, or collaboration opportunities.',
};

export default function ContactPage() {
  const contactDetails = [
    { icon: MapPin, text: "Kampala, Uganda", href: "#" },
    { icon: Mail, text: "info@aicode.org", href: "mailto:info@aicode.org" },
    { icon: Phone, text: "+256 123 456 789", href: "tel:+256123456789" },
  ] as const;

  return (
    <div className="animate-enter">
      <header className="relative py-16 text-primary-foreground md:py-24 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/contact-hero.png"
            alt="Get in touch with AICOD"
            fill
            className="object-cover"
            priority
          />
          {/* Brand Color Overlay */}
          <div className="absolute inset-0 bg-brand-green/70 mix-blend-multiply" />
          {/* Dark Gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-lg">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90 drop-shadow-md">
            We&apos;d love to hear from you. Whether you have a question, feedback, or want to collaborate, please reach out.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          {/* Contact Form */}
          <div className="md:col-span-3">
            <h2 className="mb-6 font-headline text-3xl font-bold text-primary">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Info & Map */}
          <div className="md:col-span-2">
            <h2 className="mb-6 font-headline text-3xl font-bold text-primary">Contact Information</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                {contactDetails.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-4 text-lg text-muted-foreground transition-colors hover:text-primary"
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0 text-accent" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
              <div className="h-[450px] w-full overflow-hidden rounded-lg shadow-lg relative z-0">
                <MapWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}