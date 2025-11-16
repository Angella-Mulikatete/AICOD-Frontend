import Image from 'next/image';
import { getPlaceholderImage } from '@/lib/image-assets';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AICOD. Contact us for questions, feedback, or collaboration opportunities.',
};

export default function ContactPage() {
  const mapImage = getPlaceholderImage('contact-map');
  
  const contactDetails = [
    { icon: MapPin, text: "Kampala, Uganda", href: "#" },
    { icon: Mail, text: "info@aicode.org", href: "mailto:info@aicode.org" },
    { icon: Phone, text: "+256 123 456 789", href: "tel:+256123456789" },
  ] as const;

  return (
    <div className="animate-enter">
      <header className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Get In Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
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
              {mapImage && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={600}
                    height={450}
                    className="w-full object-cover"
                    priority={false}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}