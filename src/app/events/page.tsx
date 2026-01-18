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

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-brand-orange py-16 text-white text-center">
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
