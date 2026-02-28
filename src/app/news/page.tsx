'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Loader2, Calendar, User, ArrowRight, Video, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { publicService, contentService } from '@/lib/api/services/public.service';
import { NewsItem, PaginatedNews, HeroSection, PublicPage } from '@/lib/api/models';
import { resolveImageUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

function NewsContent() {
    // ... (rest of the NewsContent component remains the same)
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentSlug = searchParams.get('slug');
    const searchQuery = searchParams.get('search') || '';
    const currentPage = parseInt(searchParams.get('page') || '1');

    const [newsDetails, setNewsDetails] = useState<NewsItem | null>(null);
    const [searchResults, setSearchResults] = useState<PaginatedNews | null>(null);
    const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        async function initFetch() {
            setLoading(true);
            try {
                const recent = await publicService.getRecentNews(5);
                if (recent.success) setRecentNews(recent.data);

                if (currentSlug) {
                    await fetchDetails(currentSlug);
                } else {
                    await fetchSearch(searchQuery, currentPage);
                }
            } catch (error) {
                console.error('Initialization error:', error);
            } finally {
                setLoading(false);
            }
        }
        initFetch();
    }, [currentSlug, searchQuery, currentPage]);

    const fetchDetails = async (slug: string) => {
        setDetailsLoading(true);
        try {
            const response = await publicService.getNewsBySlug(slug);
            if (response.success) {
                setNewsDetails(response.data.news);
            }
        } catch (error) {
            console.error('Failed to fetch news details:', error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const fetchSearch = async (query: string, page: number) => {
        try {
            const response = await publicService.getNews({ search: query, page });
            if (response.success) {
                setSearchResults(response.data);
            }
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchInput) params.set('search', searchInput);
        params.set('page', '1');
        router.push(`/news?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`/news?${params.toString()}`);
    };

    const selectNews = (slug: string) => {
        const params = new URLSearchParams();
        params.set('slug', slug);
        router.push(`/news?${params.toString()}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-brand-blue" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <main className="lg:col-span-8">
                    {currentSlug && newsDetails ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {detailsLoading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
                                </div>
                            ) : (
                                <article className="prose prose-lg max-w-none">
                                    <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-8 shadow-xl">
                                        <Image
                                            src={resolveImageUrl(newsDetails.featured_image, '/assets/images/contact-hero.png')}
                                            alt={newsDetails.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex gap-4 mb-6 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {format(new Date(newsDetails.published_at), 'MMMM dd, yyyy')}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {newsDetails.author.name}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl font-extrabold text-brand-blue mb-6 leading-tight font-sans">
                                        {newsDetails.title}
                                    </h1>

                                    <div
                                        className="text-gray-700 leading-relaxed space-y-4"
                                        dangerouslySetInnerHTML={{ __html: newsDetails.content || '' }}
                                    />

                                    <div className="mt-12 pt-8 border-t border-slate-100">
                                        <Button
                                            variant="outline"
                                            onClick={() => router.push('/news')}
                                            className="rounded-full flex items-center gap-2"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Back to All News
                                        </Button>
                                    </div>
                                </article>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-brand-blue mb-8">
                                {searchQuery ? `Search Results for "${searchQuery}"` : 'Latest News'}
                            </h2>

                            <div className="grid gap-8">
                                {searchResults?.items.map((item) => (
                                    <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded-3xl group">
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                                                <Image
                                                    src={resolveImageUrl(item.featured_image, '/assets/images/contact-hero.png')}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <CardContent className="flex-1 p-6 md:p-8">
                                                <div className="flex items-center gap-3 text-xs font-semibold text-brand-orange uppercase tracking-wider mb-3">
                                                    <Calendar className="w-3 h-3" />
                                                    {format(new Date(item.published_at), 'MMM dd, yyyy')}
                                                </div>
                                                <h3 className="text-xl font-bold text-brand-blue mb-3 group-hover:text-brand-orange transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-2 mb-6 text-sm leading-relaxed">
                                                    {item.summary}
                                                </p>
                                                <Button
                                                    onClick={() => selectNews(item.slug)}
                                                    className="bg-brand-blue hover:bg-brand-blue/90 text-white rounded-full px-6"
                                                >
                                                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                                                </Button>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {searchResults && searchResults.pagination.last_page > 1 && (
                                <div className="flex items-center justify-center gap-4 mt-12">
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="rounded-full"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Prev
                                    </Button>
                                    <span className="text-sm font-medium text-gray-500">
                                        Page {currentPage} of {searchResults.pagination.last_page}
                                    </span>
                                    <Button
                                        variant="outline"
                                        disabled={currentPage === searchResults.pagination.last_page}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="rounded-full"
                                    >
                                        Next <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </main>

                {/* SIDEBAR (Right) */}
                <aside className="lg:col-span-4 space-y-10">

                    {/* Search Bar */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h3 className="font-bold text-brand-blue mb-4">Search News</h3>
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Keywords..."
                                className="pl-10 rounded-full border-slate-200 focus:ring-brand-blue"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </form>
                    </div>

                    {/* Recent News */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-brand-blue text-xl flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-brand-orange rounded-full" />
                            Recent Updates
                        </h3>
                        <div className="space-y-4">
                            {recentNews.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => selectNews(item.slug)}
                                    className="flex gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-colors"
                                >
                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                        <Image
                                            src={resolveImageUrl(item.featured_image, '/assets/images/contact-hero.png')}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="font-bold text-sm text-brand-blue line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
                                            {item.title}
                                        </h4>
                                        <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">
                                            {format(new Date(item.published_at), 'MMM dd, yyyy')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    );
}

export default function NewsPage() {
    const [hero, setHero] = useState<HeroSection | null>(null);
    const [page, setPage] = useState<PublicPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHeaderData() {
            try {
                const [heroRes, pageRes] = await Promise.all([
                    contentService.getHeroByPage('news').catch(() => ({ success: false, data: null })),
                    publicService.getPageBySlug('news').catch(() => ({ success: false, data: null }))
                ]);
                if (heroRes.success) setHero(heroRes.data);
                if (pageRes.success) setPage(pageRes.data);
            } catch (err) {
                console.error("Header fetch error", err);
            } finally {
                setLoading(false);
            }
        }
        fetchHeaderData();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <header className="relative py-24 text-white text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={resolveImageUrl(hero?.background_image, "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080")}
                        alt={hero?.title || "News & Updates"}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-brand-blue/70 mix-blend-multiply" />
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 shadow-sm italic">
                        {hero?.title || 'News & Updates'}
                    </h1>
                    <p className="text-blue-50 max-w-2xl mx-auto px-4 text-lg">
                        {hero?.subtitle || 'Stay informed about our latest campaigns, community impacts, and environmental initiatives in the Albertine region.'}
                    </p>
                </div>
            </header>

            <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-12 h-12 animate-spin text-brand-blue" /></div>}>
                <NewsContent />
            </Suspense>
        </div>
    );
}
