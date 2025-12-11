import { Button } from '@/components/ui/button';
import { Copy, Mail } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';


export const metadata: Metadata = {
  title: 'Donations',
};

export default function DonationsPage() {
  const bankDetails = {
    'Bank Name': 'Equity Bank Uganda Limited',
    'Account Name': 'Albertine Institute For Community Development',
    'Account Number': '1032101921319',
    'Swift Code': 'EQBLUGKA',
    'Branch': 'Kampala Road',
  };

  return (
    <div className="animate-enter">
      <header className="relative py-16 text-white md:py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop"
          alt="Community support and donation"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/70 to-brand-orange/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-headline text-4xl font-bold md:text-5xl drop-shadow-lg">Support Our Work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg drop-shadow-md">
            Your contribution, no matter the size, makes a real difference in the lives of the communities we serve and helps protect our shared environment.
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Creative Write-up */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-brand-blue">Get Involved</h2>
            <div className="w-12 h-1 bg-brand-orange rounded-full" />
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that true impact is built on trust and protection. To ensure your support reaches the right hands securely, we handle all partnerships and donations through direct contact.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Please reach out to our team to discuss how you can support our mission—whether through financial contribution, equipment, or expertise. We look forward to building a meaningful partnership with you.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="bg-brand-green hover:bg-[#7FB32D] text-white rounded-full px-8">
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="w-5 h-5" /> Contact Us to Support
                </Link>
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
              alt="Volunteers helping community"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply" />
          </div>

        </div>
      </div>
    </div>
  );
}
