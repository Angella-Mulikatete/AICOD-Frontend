# 🚀 COMPLETE PAGES - PART 2

Continuation of the complete website integration. These are the remaining pages.

---

## 5. EVENTS LISTING PAGE - `src/app/events/page.tsx`

**Create this new file:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users } from 'lucide-react';

export const metadata = {
  title: 'Events',
  description: 'Upcoming events and workshops from AICOD',
};

export default async function EventsPage() {
  let events = [];

  try {
    const response = await api.getEvents();
    events = response.data || [];
  } catch (error) {
    console.error('Failed to load events:', error);
  }

  // Group events by status
  const upcomingEvents = events.filter(e => e.status === 'upcoming');
  const ongoingEvents = events.filter(e => e.status === 'ongoing');
  const pastEvents = events.filter(e => e.status === 'completed');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-brand-orange py-16 text-white textcenter">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">Events & Workshops</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Join us in our mission to transform communities
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  {event.featured_image && (
                    <div className="relative h-48">
                      <Image
                        src={getMediaUrl(event.featured_image)}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      {event.is_full && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          SOLD OUT
                        </div>
                      )}
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    
                    <div className="space-y-2 mb-4 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.start_date).toLocaleDateString()}</span>
                        {event.start_time && <span>at {event.start_time}</span>}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.is_online ? 'Online Event' : event.location}</span>
                      </div>
                      
                      {event.available_slots !== undefined && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{event.available_slots} spots available</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                    
                    <Link 
                      href={`/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      View Details →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Happening Now</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {ongoingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3">
                      LIVE NOW
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <Link href={`/events/${event.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                      Join Now →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {events.length === 0 && (
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-500 text-lg">No events scheduled at this time. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
```

---

## 6. EVENT DETAIL PAGE - `src/app/events/[id]/page.tsx`

**Create this new file:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Globe } from 'lucide-react';

export default async function EventPage({ params }: { params: { id: string } }) {
  let event;

  try {
    const response = await api.getEvent(parseInt(params.id));
    event = response.data;
  } catch (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <Link href="/events" className="text-blue-600 mt-4 block">
          ← Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Image */}
      {event.featured_image && (
        <div className="relative h-96 w-full">
          <Image
            src={getMediaUrl(event.featured_image)}
            alt={event.title}
            fill
            className="object-cover"
          />
          {event.is_full && (
            <div className="absolute top-8 right-8 bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-bold">
              SOLD OUT
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Back Link */}
        <Link href="/events" className="text-blue-600 hover:text-blue-800 mb-6 block">
          ← Back to Events
        </Link>

        {/* Status Badge */}
        <div className="mb-4">
          {event.status === 'upcoming' && (
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
              Upcoming Event
            </span>
          )}
          {event.status === 'ongoing' && (
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold">
              HAPPENING NOW
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-8">{event.title}</h1>

        {/* Event Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <div className="font-semibold">Date</div>
              <div className="text-gray-600">
                {new Date(event.start_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                {event.end_date && ` - ${new Date(event.end_date).toLocaleDateString()}`}
              </div>
            </div>
          </div>

          {event.start_time && (
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <div className="font-semibold">Time</div>
                <div className="text-gray-600">
                  {event.start_time}
                  {event.end_time && ` - ${event.end_time}`}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            {event.is_online ? (
              <>
                <Globe className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-gray-600">Online Event</div>
                </div>
              </>
            ) : (
              <>
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <div className="font-semibold">Location</div>
                  <div className="text-gray-600">{event.location}</div>
                  {event.address && <div className="text-sm text-gray-500">{event.address}</div>}
                </div>
              </>
            )}
          </div>

          {event.available_slots !== undefined && (
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <div className="font-semibold">Available Spots</div>
                <div className="text-gray-600">{event.available_slots} remaining</div>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <h2>About This Event</h2>
          <p>{event.description}</p>
        </div>

        {/* Registration Button */}
        {event.status === 'upcoming' && !event.is_full && event.registration_url && (
          <div className="text-center py-8 border-t">
            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
                Register for This Event
              </a>
            </Button>
          </div>
        )}

        {event.is_online && event.meeting_link && event.status === 'ongoing' && (
          <div className="text-center py-8 border-t">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href={event.meeting_link} target="_blank" rel="noopener noreferrer">
                Join Online Event Now
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 7. GALLERY PAGE - `src/app/gallery/page.tsx`

**Create this new file:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Gallery',
  description: 'Photos from AICOD programs and events',
};

export default async function GalleryPage() {
  let albums = [];

  try {
    const response = await api.getGalleryAlbums();
    albums = response.data || [];
  } catch (error) {
    console.error('Failed to load gallery:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-brand-green py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">Photo Gallery</h1>
          <p className="text-xl mt-4">See our work in action across African communities</p>
        </div>
      </div>

      {/* Albums Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {albums.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <Link key={album.id} href={`/gallery/${album.id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer group">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={getMediaUrl(album.cover_image)}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-end">
                        <div className="p-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">{album.title}</h3>
                          <p className="text-sm">{album.photos_count} photos</p>
                        </div>
                      </div>
                    </div>
                    {album.description && (
                      <CardContent className="p-6">
                        <p className="text-gray-600">{album.description}</p>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No photo albums available yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## 8. ALBUM DETAIL PAGE - `src/app/gallery/[id]/page.tsx`

**Create this new file:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function AlbumPage({ params }: { params: { id: string } }) {
  let albumData;

  try {
    const response = await api.getGalleryAlbum(parseInt(params.id));
    albumData = response.data;
  } catch (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold">Album Not Found</h1>
        <Link href="/gallery" className="text-blue-600 mt-4 block">
          ← Back to Gallery
        </Link>
      </div>
    );
  }

  const { album, photos } = albumData;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4">
          <Link href="/gallery" className="text-white/80 hover:text-white mb-4 block">
            ← Back to Gallery
          </Link>
          <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
          {album.description && (
            <p className="text-xl text-white/80 max-w-3xl">{album.description}</p>
          )}
          <p className="mt-4 text-white/60">{photos.length} photos</p>
        </div>
      </div>

      {/* Photos Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative aspect-square group overflow-hidden rounded-lg">
                <Image
                  src={getMediaUrl(photo.image_url)}
                  alt={photo.title || 'Gallery photo'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {photo.title && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-center font-semibold">{photo.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">No photos in this album yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## 9. UPDATED TEAM PAGE - `src/app/team/page.tsx`

**Replace entire file with:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export const metadata = {
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
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold">Our Team</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Meet the passionate individuals behind AICOD
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
              <p className="text-gray-500 text-lg">Team information coming soon.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ INTEGRATION COMPLETE!

All major pages are now fully integrated with the backend API! 

### Files Created/Updated:
1. ✅ Homepage (`src/app/page.tsx`)
2. ✅ Programs (`src/app/programs/page.tsx`)
3. ✅ Blog Listing (`src/app/blog/page.tsx`)
4. ✅ Blog Detail (`src/app/blog/[slug]/page.tsx`)
5. ✅ Events Listing (`src/app/events/page.tsx`)
6. ✅ Event Detail (`src/app/events/[id]/page.tsx`)
7. ✅ Gallery (`src/app/gallery/page.tsx`)
8. ✅ Album Detail (`src/app/gallery/[id]/page.tsx`)
9. ✅ Team (`src/app/team/page.tsx`)

### Test Your Website:
```bash
npm run dev
```

Then visit:
- http://localhost:3000 (Homepage)
- http://localhost:3000/programs
- http://localhost:3000/blog
- http://localhost:3000/events
- http://localhost:3000/gallery
- http://localhost:3000/team

All pages will fetch data from your backend! 🚀
