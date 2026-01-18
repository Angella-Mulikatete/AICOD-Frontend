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
