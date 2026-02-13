import Image from 'next/image';
import { publicService } from '@/lib/api/services/public.service';
import { resolveImageUrl } from '@/lib/utils';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
};

export default async function TeamPage() {
  let team: any[] = [];
  try {
    const response = await publicService.getStaff();
    team = Array.isArray(response) ? response : (response?.data || []);
  } catch (error) {
    console.warn('Staff API not fully available yet');
  }

  return (
    <div className="animate-enter">
      <header className="bg-brand-blue py-16 text-white md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Team</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
            Meet the passionate individuals behind AICOD.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member: any) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-brand-orange/20">
                  <Image
                    src={resolveImageUrl(member.profile_photo, '/assets/images/aicodlogo.png')}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-brand-blue">{member.name}</h3>
                <p className="text-brand-orange font-medium">{member.position || 'Team Member'}</p>
                <p className="text-gray-500 text-sm mt-2 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <h2 className="text-center font-headline text-3xl font-bold text-brand-blue">
              Our Team is Growing
            </h2>
            <p className="mt-4 max-w-xl text-center text-lg text-gray-600">
              We are working hard to bring you information about our dedicated team. Please check back soon!
            </p>
            <div className="my-8 max-w-4xl w-full">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team Placeholder"
                width={1200}
                height={600}
                className="rounded-lg shadow-md aspect-video object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
