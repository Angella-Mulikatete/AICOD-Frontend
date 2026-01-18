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
