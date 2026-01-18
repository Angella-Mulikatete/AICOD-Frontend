import { api, getMediaUrl } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    let post;

    try {
        const response = await api.getBlogPost(params.slug);
        post = response.data;
    } catch (error) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold">Post Not Found</h1>
                <Link href="/blog" className="text-blue-600 mt-4 block">
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen">
            {/* Featured Image */}
            {post.featured_image && (
                <div className="relative h-96 w-full">
                    <Image
                        src={getMediaUrl(post.featured_image)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                        ← Back to Blog
                    </Link>
                </div>

                {/* Category */}
                {post.category && (
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                        {post.category.name}
                    </span>
                )}

                {/* Title */}
                <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
                    {post.author && (
                        <div className="flex items-center gap-2">
                            <span>By {post.author.name}</span>
                        </div>
                    )}
                    <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    <span>{post.views} views</span>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mb-8">
                        {post.tags.map((tag) => (
                            <span key={tag.id} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg max-w-none mb-12"
                    dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
                />

                {/* Back to Blog */}
                <div className="text-center pt-12 border-t">
                    <Button asChild>
                        <Link href="/blog">View All Posts</Link>
                    </Button>
                </div>
            </div>
        </article>
    );
}
