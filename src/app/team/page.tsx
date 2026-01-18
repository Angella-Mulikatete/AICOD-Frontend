import { api, getMediaUrl } from '@/lib/api';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the passionate individuals behind AICOD',
};

export default async function TeamPage() {
  let teamMembers = [];

  try {
    const response = await api.getTeam();
    teamMembers = response.data || [];
  } catch (error) {
    console.error('Failed to load team:', error);
  }

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

      <div className="container mx-auto px-4 py-16">
        {teamMembers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {member.photo ? (
                  <div className="relative h-64">
                    <Image
                      src={getMediaUrl(member.photo)}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <div className="text-6xl font-bold text-gray-400">
                      {member.name.charAt(0)}
                    </div>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.position}</p>
                  {member.department && (
                    <p className="text-gray-600 text-sm mb-3">{member.department}</p>
                  )}
                  {member.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  )}

                  {/* Social Links */}
                  <div className="flex gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-600 hover:text-blue-600"
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a
                        href={member.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                        title="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">
              Our Amazing Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Team information will be available soon. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
