import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
    title: 'Blog & News',
    description: 'Latest news and stories from AICOD',
};

export default async function BlogPage() {
    let posts = [];

    try {
        const response = await api.getBlog(1);
        posts = response.data || [];
    } catch (error) {
        console.error('Failed to load blog posts:', error);
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="bg-brand-green py-16 text-white text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold">Blog & News</h1>
                    <p className="text-xl mt-4 max-w-2xl mx-auto">
                        Latest stories and updates from our work in African communities
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                                    {post.featured_image && (
                                        <div className="relative h-56">
                                            <Image
                                                src={getMediaUrl(post.featured_image)}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <CardContent className="p-6">
                                        {post.category && (
                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                                                {post.category.name}
                                            </span>
                                        )}
                                        <h2 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h2>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                            {post.author && <span>By {post.author.name}</span>}
                                            <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                        </div>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="text-blue-600 hover:text-blue-800 font-semibold"
                                        >
                                            Read More →
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No blog posts available yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
