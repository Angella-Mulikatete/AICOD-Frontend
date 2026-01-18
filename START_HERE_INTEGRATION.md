# 🚀 START HERE - Quick Integration Guide

**Your backend is READY! All 25+ endpoints are working!**

## ✅ Setup Complete!

- ✅ Backend APIs implemented and tested
- ✅ Complete API documentation received
- ✅ `src/lib/api.ts` updated with all endpoints
- ✅ `.env.local` configured
- ✅ TypeScript types added

---

## 🎯 IMMEDIATE NEXT STEPS

### Step 1: Test the Backend (2 minutes)

Open these URLs in your browser to verify:

```
http://localhost:8000/api/v1/homepage
http://localhost:8000/api/v1/menu/header
http://localhost:8000/api/v1/footer
http://localhost:8000/api/v1/programs
http://localhost:8000/api/v1/blog
http://localhost:8000/api/v1/testimonials/featured
```

✅ All should return JSON data!

---

### Step 2: Your Backend Developer Gave You These Endpoints

#### **Core Site** (Use First!)
- ✅ `api.getMenu('header')` - Navigation
- ✅ `api.getFooter()` - Footer data
- ✅ `api.getSocialMedia()` - Social links

#### **Homepage** (Next Priority!)
- ✅ `api.getHomepage()` - EVERYTHING for homepage in one call!
- ✅ `api.getFeaturedTestimonials()` - Customer reviews
- ✅ `api.getHero('homepage')` - Hero section

#### **Content**
- ✅ `api.getBlog(1)` - Blog posts (with pagination)
- ✅ `api.getBlogPost(slug)` - Single post
- ✅ `api.getEvents()` - Events list
- ✅ `api.getGalleryAlbums()` - Photo albums

#### **Existing (Already Working)**
- ✅ `api.getPrograms()` - Programs
- ✅ `api.getTeam()` - Team members
- ✅ `api.getPartners()` - Partners
- ✅ `api.submitContact(data)` - Contact form

---

## 📂 What Files to Create/Update

### Priority 1: Layout Components

#### 1. **Dynamic Header** 
**File:** `src/components/Header.tsx` or `src/app/layout.tsx`

```typescript
'use client';
import { useEffect, useState } from 'react';
import { api, type MenuItem } from '@/lib/api';
import Link from 'next/link';

export default function Header() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    api.getMenu('header').then(res => {
      setMenu(res.data.items);
    });
  }, []);

  return (
    <nav>
      {menu.map(item => (
        <Link key={item.id} href={item.url}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

#### 2. **Dynamic Footer**
**File:** `src/components/Footer.tsx`

```typescript
'use client';
import { useEffect, useState } from 'react';
import { api, type FooterData } from '@/lib/api';

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);

  useEffect(() => {
    api.getFooter().then(res => {
      setFooter(res.data);
    });
  }, []);

  if (!footer) return <div>Loading...</div>;

  return (
    <footer>
      <p>{footer.about_text}</p>
      <div>
        {footer.social_media.map(social => (
          <a key={social.id} href={social.url}>
            {social.platform}
          </a>
        ))}
      </div>
      <p>{footer.copyright_text}</p>
    </footer>
  );
}
```

---

### Priority 2: Homepage

**File:** `src/app/page.tsx`

```typescript
import { api, getMediaUrl } from '@/lib/api';

export default async function Homepage() {
  const response = await api.getHomepage();
  const { hero, statistics, featured_programs, cta_section } = response.data;

  return (
    <div>
      {/* Hero */}
      <section 
        style={{backgroundImage: `url(${getMediaUrl(hero.background_image)})`}}
        className="h-screen flex items-center justify-center"
      >
        <div>
          <h1 className="text-6xl font-bold text-white">{hero.title}</h1>
          <p className="text-xl text-white">{hero.subtitle}</p>
          <a href={hero.cta_primary_link} className="btn">
            {hero.cta_primary_text}
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="grid grid-cols-4 gap-8">
          {statistics.map(stat => (
            <div key={stat.label} className="text-center">
              <h3 className="text-5xl font-bold">{stat.formatted_value}</h3>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-20">
        <h2 className="text-4xl font-bold mb-8">Our Programs</h2>
        <div className="grid grid-cols-3 gap-6">
          {featured_programs.map(program => (
            <div key={program.id}>
              <img src={getMediaUrl(program.featured_image)} alt={program.title} />
              <h3 className="text-2xl font-semibold">{program.title}</h3>
              <p>{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold">{cta_section.title}</h2>
        <a href={cta_section.button_link} className="btn-white mt-6">
          {cta_section.button_text}
        </a>
      </section>
    </div>
  );
}
```

---

### Priority 3: Content Pages

#### **Blog Page**
**File:** `src/app/blog/page.tsx`

```typescript
import { api, getMediaUrl } from '@/lib/api';
import Link from 'next/link';

export default async function BlogPage() {
  const response = await api.getBlog(1);
  const posts = response.data;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-5xl font-bold mb-8">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <article key={post.id} className="border rounded-lg overflow-hidden">
            <img 
              src={getMediaUrl(post.featured_image)} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

#### **Blog Post Detail**
**File:** `src/app/blog/[slug]/page.tsx`

```typescript
import { api, getMediaUrl } from '@/lib/api';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const response = await api.getBlogPost(params.slug);
  const post = response.data;

  return (
    <article className="container mx-auto py-12 max-w-4xl">
      <img 
        src={getMediaUrl(post.featured_image)} 
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 mb-8 text-gray-600">
        <span>By {post.author?.name}</span>
        <span>•</span>
        <span>{new Date(post.published_at).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.views} views</span>
      </div>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />
    </article>
  );
}
```

---

## 🎨 Image Helper Function

Always use `getMediaUrl()` for images:

```typescript
import { getMediaUrl } from '@/lib/api';

// Usage:
<img src={getMediaUrl(program.featured_image)} alt={program.title} />
```

This automatically handles:
- Null/undefined paths (returns placeholder)
- Relative paths (prepends backend URL)
- Full URLs (returns as-is)

---

## 📋 Integration Checklist

### Phase 1: Core (Do This First!)
- [ ] Update Header with `api.getMenu('header')`
- [ ] Update Footer with `api.getFooter()`
- [ ] Test navigation works
- [ ] Test social media links work

### Phase 2: Homepage
- [ ] Replace static homepage with `api.getHomepage()`
- [ ] Add statistics counter
- [ ] Add testimonials section
- [ ] Test hero image loads

### Phase 3: Content
- [ ] Create blog listing page
- [ ] Create blog detail page
- [ ] Create events page
- [ ] Create gallery page

### Phase 4: Polish
- [ ] Add loading states
- [ ] Add error handling
- [ ] Optimize images
- [ ] Test on mobile

---

## 🔍 Testing Your Integration

### Test Each Endpoint:

```bash
# In your browser console (on your Next.js site)
import { api } from '@/lib/api'

// Test homepage
await api.getHomepage()

// Test menu
await api.getMenu('header')

// Test blog
await api.getBlog(1)
```

---

## 🆘 Troubleshooting

### CORS Error?
- Make sure backend is running: `php artisan serve`
- Check backend CORS config allows `localhost:3000`

### Images Not Loading?
- Use `getMediaUrl()` helper function
- Check image paths in backend response
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### TypeScript Errors?
- Run `npm run build` to see TypeScript errors
- Check that types match API responses

---

## 📚 Documentation Files

- **`API_DOCUMENTATION_COMPLETE.md`** - Full API reference from backend
- **`src/lib/api.ts`** - Your API service (updated!)
- This file - Quick start guide

---

## 🎉 YOU'RE READY!

**Start with Priority 1** (Header & Footer), then move to Priority 2 (Homepage), then Priority 3 (Content pages).

All APIs are tested and working. Just fetch and display! 🚀

**Questions? Check the API_DOCUMENTATION_COMPLETE.md file!**
