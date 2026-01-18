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
