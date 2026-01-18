# 🚀 FINAL WEBSITE INTEGRATION - ALL CODE READY

This document contains ALL the updated code to make your website fully dynamic. Copy and paste these files to complete the integration.

---

## 📋 FILES TO UPDATE

1. ✅ Homepage (`src/app/page.tsx`)
2. ✅ Programs Page (`src/app/programs/page.tsx`)
3. ✅ Team Page (`src/app/team/page.tsx`)
4. ✅ Partners Page (`src/app/partners/page.tsx`)
5. ✅ Blog Pages (NEW - create these)
6. ✅ Events Pages (NEW - create these)
7. ✅ Gallery Pages (NEW - create these)

---

## 1. HOMEPAGE - `src/app/page.tsx`

**Replace entire file with:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default async function HomePage() {
  let homepageData;
  
  try {
    const response = await api.getHomepage();
    homepageData = response.data;
  } catch (error) {
    console.error('Failed to load homepage:', error);
    // Return fallback UI
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Welcome to AICOD</h1>
        <p className="mt-4">Empowering Communities, Transforming Lives</p>
      </div>
    );
  }

  const { hero, statistics, featured_programs, mission_section, vision_section, cta_section } = homepageData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: hero.background_image ? `url(${getMediaUrl(hero.background_image)})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {hero.title}
          </h1>
          {hero.subtitle && (
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {hero.subtitle}
            </p>
          )}
          <div className="flex gap-4 justify-center">
            {hero.cta_primary_text && (
              <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                <Link href={hero.cta_primary_link || '/programs'}>
                  {hero.cta_primary_text}
                </Link>
              </Button>
            )}
            {hero.cta_secondary_text && (
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                <Link href={hero.cta_secondary_link || '/donations'}>
                  {hero.cta_secondary_text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {statistics && statistics.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 
                    className="text-5xl md:text-6xl font-bold mb-2"
                    style={{ color: stat.color || '#1e40af' }}
                  >
                    {stat.formatted_value}
                  </h3>
                  <p className="text-lg text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Programs Section */}
      {featured_programs && featured_programs.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured_programs.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {program.featured_image && (
                    <div className="relative h-48">
                      <Image
                        src={getMediaUrl(program.featured_image)}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <Link 
                      href={`/programs/${program.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link href="/programs">View All Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision Section */}
      {(mission_section || vision_section) && (
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {mission_section && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">{mission_section.title}</h2>
                  <div 
                    className="prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: mission_section.content }}
                  />
                </div>
              )}
              {vision_section && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">{vision_section.title}</h2>
                  <div 
                    className="prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: vision_section.content }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta_section && (
        <section 
          className="py-20 bg-brand-blue text-white text-center"
          style={{
            backgroundImage: cta_section.background_image ? `url(${getMediaUrl(cta_section.background_image)})` : undefined
          }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">{cta_section.title}</h2>
            {cta_section.description && (
              <p className="text-xl mb-8 max-w-2xl mx-auto">{cta_section.description}</p>
            )}
            <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
              <Link href={cta_section.button_link}>
                {cta_section.button_text}
              </Link>
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
```

---

## 2. PROGRAMS PAGE - `src/app/programs/page.tsx`

**Replace entire file with:**

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Our Programs',
  description: 'Discover AICOD\'s programs transforming communities across Africa',
};

export default async function ProgramsPage() {
  let programs = [];
  let categories = [];

  try {
    const [programsResponse, categoriesResponse] = await Promise.all([
      api.getPrograms(),
      api.getProgramCategories()
    ]);
    
    programs = programsResponse.data || [];
    categories = categoriesResponse.data || [];
  } catch (error) {
    console.error('Failed to load programs:', error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-blue py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Our Programs</h1>
          <p className="max-w-2xl mx-auto mt-4 text-blue-100">
            Holistic approaches to sustainable development
          </p>
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: category.color || '#3B82F6' }}
                    >
                      {category.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.programs_count} programs</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {program.featured_image && (
                  <div className="relative h-48">
                    <Image
                      src={getMediaUrl(program.featured_image)}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {program.category && (
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
                      style={{ backgroundColor: program.category.color || '#3B82F6' }}
                    >
                      {program.category.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  {program.target_beneficiaries && (
                    <p className="text-sm text-gray-500 mb-4">
                      Target Beneficiaries: {program.target_beneficiaries.toLocaleString()}
                    </p>
                  )}
                  <Link 
                    href={`/programs/${program.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {programs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No programs available at this time.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
```

---

## 3. BLOG LISTING PAGE - `src/app/blog/page.tsx`

**Create this new file:**

```typescript
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
```

---

## 4. BLOG POST DETAIL - `src/app/blog/[slug]/page.tsx`

**Create this new file:**

```typescript
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
```

---

##  CONTINUE IN NEXT FILE...

**Due to size limits, I'll create a second file with the remaining pages (Events, Gallery, Team, Partners updates).**

Would you like me to:
1. ✅ Continue with the remaining pages in another document?
2. ✅ Create a summary checklist of what to do?
3. ✅ Help you test one page at a time?

Let me know and I'll complete the rest! 🚀
