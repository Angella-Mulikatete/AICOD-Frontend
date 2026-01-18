# 🚀 COMPLETE API DOCUMENTATION - FOR FRONTEND TEAM

**Date:** January 18, 2026  
**Backend:** Laravel 10 + Filament 3  
**Base URL:** `http://localhost:8000/api/v1`  
**Production URL:** `https://yourdomain.com/api/v1`

---

## 📋 TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Phase 1: Core Site APIs](#phase-1-core-site-apis)
3. [Phase 2: Homepage APIs](#phase-2-homepage-apis)
4. [Phase 3: Content APIs](#phase-3-content-apis)
5. [Existing APIs](#existing-apis)
6. [Complete API Service Code](#complete-api-service-code)
7. [Integration Examples](#integration-examples)
8. [Error Handling](#error-handling)

---

## 🚀 QUICK START

### 1. Setup Environment Variables

Create/update `.env.local` in your Next.js project:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Create API Service File

Create `src/lib/api.js`:

```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Helper function
  async get(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  },

  // Phase 1: Core Site
  getMenu: (location) => api.get(`/menu/${location}`),
  getFooter: () => api.get('/footer'),
  getSocialMedia: () => api.get('/social-media'),

  // Phase 2: Homepage
  getHomepage: () => api.get('/homepage'),
  getTestimonials: () => api.get('/testimonials'),
  getFeaturedTestimonials: () => api.get('/testimonials/featured'),
  getHero: (page) => api.get(`/heroes/${page}`),

  // Phase 3: Content
  getBlog: (page = 1) => api.get(`/blog?page=${page}`),
  getBlogPost: (slug) => api.get(`/blog/${slug}`),
  getEvents: () => api.get('/events'),
  getEvent: (id) => api.get(`/events/${id}`),
  getGalleryAlbums: () => api.get('/gallery/albums'),
  getGalleryAlbum: (id) => api.get(`/gallery/albums/${id}`),
  getRecentPhotos: () => api.get('/gallery/recent'),

  // Existing APIs
  getPrograms: () => api.get('/programs'),
  getProgramBySlug: (slug) => api.get(`/programs/${slug}`),
  getTeam: () => api.get('/team'),
  getPartners: () => api.get('/partners'),
  getFAQs: () => api.get('/faqs'),
  getCompany: () => api.get('/company'),

  // Forms
  submitContact: (data) => api.post('/contact', data),
  subscribeNewsletter: (email) => api.post('/newsletter/subscribe', { email }),
  submitDonation: (data) => api.post('/donations/request', data),
};
```

### 3. Configure CORS (Backend - Already Done!)

Backend is configured to accept requests from `http://localhost:3000`

---

## 📱 PHASE 1: CORE SITE APIs

### 1. Navigation Menu API

**Endpoint:** `GET /menu/{location}`

**Locations:** `header`, `footer`, `mobile`

**Example Request:**
```javascript
const menuData = await api.getMenu('header');
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": "header",
    "items": [
      {
        "id": 1,
        "label": "Home",
        "url": "/",
        "type": "internal",
        "icon": "home",
        "open_new_tab": false,
        "children": []
      },
      {
        "id": 2,
        "label": "About",
        "url": "/about",
        "children": [
          {
            "id": 3,
            "label": "Our Story",
            "url": "/our-story"
          }
        ]
      }
    ]
  }
}
```

**Usage Example:**
```jsx
// components/Header.jsx
'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

export default function Header() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.getMenu('header').then(data => {
      setMenu(data.data.items);
    });
  }, []);

  return (
    <nav>
      {menu.map(item => (
        <div key={item.id}>
          <Link href={item.url}>{item.label}</Link>
          {item.children.length > 0 && (
            <ul>
              {item.children.map(child => (
                <li key={child.id}>
                  <Link href={child.url}>{child.label}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </nav>
  );
}
```

---

### 2. Footer Data API

**Endpoint:** `GET /footer`

**Response:**
```json
{
  "success": true,
  "data": {
    "about_text": "AICOD is dedicated to empowering African communities...",
    "logo": "/images/aicod-logo-white.png",
    "quick_links": [
      {"label": "About Us", "url": "/about", "order": 1},
      {"label": "Programs", "url": "/programs", "order": 2}
    ],
    "contact_info": {
      "email": "info@aicod.org",
      "phone": "+256-700-123-456",
      "address": "Plot 123, Community Drive, Kampala, Uganda"
    },
    "social_media": [
      {"platform": "Facebook", "url": "https://facebook.com/aicod", "icon": "facebook"}
    ],
    "newsletter_enabled": true,
    "copyright_text": "© 2026 AICOD. All rights reserved."
  }
}
```

**Usage:**
```jsx
// components/Footer.jsx
const footerData = await api.getFooter();
const footer = footerData.data;

<footer>
  <p>{footer.about_text}</p>
  <div>
    {footer.social_media.map(social => (
      <a href={social.url} key={social.platform}>{social.platform}</a>
    ))}
  </div>
  <p>{footer.copyright_text}</p>
</footer>
```

---

### 3. Social Media API

**Endpoint:** `GET /social-media`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "platform": "Facebook",
      "username": "@AICOD",
      "url": "https://facebook.com/aicod",
      "icon": "facebook",
      "color": "#1877F2",
      "follower_count": 15000,
      "formatted_follower_count": "15K"
    }
  ]
}
```

---

## 🏠 PHASE 2: HOMEPAGE APIs

### 1. Complete Homepage API

**Endpoint:** `GET /homepage`

**Response:** (Returns EVERYTHING for homepage in one call!)
```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Empowering Communities Across Africa",
      "subtitle": "Building sustainable futures...",
      "background_image": "/storage/heroes/homepage-hero.jpg",
      "cta_primary_text": "Get Involved",
      "cta_primary_link": "/programs"
    },
    "featured_programs": [
      {
        "id": 1,
        "title": "School Infrastructure",
        "slug": "school-infrastructure",
        "description": "Building classrooms...",
        "featured_image": "/storage/programs/school.jpg"
      }
    ],
    "statistics": [
      {
        "label": "Communities Reached",
        "value": 150,
        "formatted_value": "150+",
        "icon": "users",
        "color": "#10b981"
      }
    ],
    "mission_section": {
      "title": "Our Mission",
      "content": "<p>To empower African communities...</p>",
      "image": "/storage/sections/mission.jpg"
    },
    "vision_section": {...},
    "values_section": {...},
    "cta_section": {
      "title": "Make a Difference Today",
      "button_text": "Donate Now",
      "button_link": "/donations"
    }
  }
}
```

**Usage:**
```jsx
// app/page.js (Homepage)
import { api } from '@/lib/api';

export default async function Homepage() {
  const homepageData = await api.getHomepage();
  const { hero, statistics, featured_programs, cta_section } = homepageData.data;

  return (
    <div>
      {/* Hero Section */}
      <section style={{backgroundImage: `url(${hero.background_image})`}}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <a href={hero.cta_primary_link}>{hero.cta_primary_text}</a>
      </section>

      {/* Statistics */}
      <section className="stats">
        {statistics.map(stat => (
          <div key={stat.label}>
            <h3>{stat.formatted_value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Programs */}
      <section>
        <h2>Our Programs</h2>
        {featured_programs.map(program => (
          <div key={program.id}>
            <img src={program.featured_image} alt={program.title} />
            <h3>{program.title}</h3>
            <p>{program.description}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section>
        <h2>{cta_section.title}</h2>
        <a href={cta_section.button_link}>{cta_section.button_text}</a>
      </section>
    </div>
  );
}
```

---

### 2. Testimonials API

**Endpoint:** `GET /testimonials`
**Featured Only:** `GET /testimonials/featured`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sarah Nakato",
      "position": "Community Leader",
      "organization": "Mbarara Women's Group",
      "testimonial": "AICOD transformed our community...",
      "photo": "/storage/testimonials/sarah.jpg",
      "rating": 5,
      "is_featured": true
    }
  ]
}
```

**Usage:**
```jsx
const testimonialsData = await api.getFeaturedTestimonials();
const testimonials = testimonialsData.data;

{testimonials.map(t => (
  <div key={t.id}>
    <img src={t.photo} alt={t.name} />
    <p>{t.testimonial}</p>
    <p>- {t.name}, {t.position}</p>
    <div>Rating: {'⭐'.repeat(t.rating)}</div>
  </div>
))}
```

---

### 3. Hero Sections API

**Endpoint:** `GET /heroes/{page}`

**Pages:** `homepage`, `about`, `programs`, `contact`, etc.

**Response:**
```json
{
  "success": true,
  "data": {
    "page": "about",
    "title": "Our Story",
    "subtitle": "Over a decade of transforming lives",
    "background_image": "/storage/heroes/about-hero.jpg",
    "cta_primary_text": "Meet Our Team",
    "cta_primary_link": "/team"
  }
}
```

---

## 📝 PHASE 3: CONTENT APIs

### 1. Blog API

**List Posts:** `GET /blog?page=1`
**Single Post:** `GET /blog/{slug}`

**List Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "New School Opens in Rural Uganda",
      "slug": "new-school-opens-rural-uganda",
      "excerpt": "Celebrating the opening of our 50th school...",
      "featured_image": "/storage/blog/school-opening.jpg",
      "author": {
        "id": 1,
        "name": "John Mukasa"
      },
      "category": {
        "id": 1,
        "name": "Education",
        "slug": "education"
      },
      "tags": [
        {"id": 1, "name": "Impact Stories", "slug": "impact-stories"}
      ],
      "views": 1250,
      "is_featured": true,
      "published_at": "2026-01-13T10:00:00.000000Z"
    }
  ],
  "meta": {
    "total": 45,
    "per_page": 10,
    "current_page": 1,
    "last_page": 5
  }
}
```

**Single Post Response:** (includes `content` field)

**Usage:**
```jsx
// app/blog/page.js
const blogData = await api.getBlog(1);
const posts = blogData.data;

{posts.map(post => (
  <article key={post.id}>
    <img src={post.featured_image} alt={post.title} />
    <h2>{post.title}</h2>
    <p>{post.excerpt}</p>
    <span>{post.category.name}</span>
    <Link href={`/blog/${post.slug}`}>Read More</Link>
  </article>
))}

// app/blog/[slug]/page.js
const postData = await api.getBlogPost(params.slug);
const post = postData.data;

<article>
  <h1>{post.title}</h1>
  <div dangerouslySetInnerHTML={{ __html: post.content }} />
  <p>By {post.author.name}</p>
  <p>{post.views} views</p>
</article>
```

---

### 2. Events API

**List Events:** `GET /events`
**Single Event:** `GET /events/{id}`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Community Development Workshop 2026",
      "slug": "community-development-workshop-2026",
      "description": "Join us for a comprehensive 3-day workshop...",
      "start_date": "2026-02-17",
      "end_date": "2026-02-19",
      "start_time": "09:00:00",
      "location": "Kampala Conference Center",
      "featured_image": "/storage/events/workshop.jpg",
      "is_online": false,
      "status": "upcoming",
      "available_slots": 55,
      "is_full": false
    }
  ]
}
```

**Usage:**
```jsx
const eventsData = await api.getEvents();
const events = eventsData.data;

{events.map(event => (
  <div key={event.id}>
    <h3>{event.title}</h3>
    <p>Date: {event.start_date}</p>
    <p>Location: {event.location}</p>
    <p>Available Slots: {event.available_slots}</p>
    {event.is_full && <span>SOLD OUT</span>}
  </div>
))}
```

---

### 3. Gallery API

**List Albums:** `GET /gallery/albums`
**Single Album:** `GET /gallery/albums/{id}`
**Recent Photos:** `GET /gallery/recent`

**Albums Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "School Construction Project 2025",
      "slug": "school-construction-2025",
      "description": "Photos from our school construction...",
      "cover_image": "/storage/gallery/albums/school-cover.jpg",
      "photos_count": 25
    }
  ]
}
```

**Single Album Response:**
```json
{
  "success": true,
  "data": {
    "album": {
      "id": 1,
      "title": "School Construction Project 2025",
      "description": "..."
    },
    "photos": [
      {
        "id": 1,
        "title": "Breaking Ground Ceremony",
        "description": "Community leaders breaking ground",
        "image_url": "/storage/gallery/school/photo-0.jpg",
        "thumbnail_url": "/storage/gallery/school/thumb-0.jpg"
      }
    ]
  }
}
```

**Usage:**
```jsx
// Gallery page
const albumsData = await api.getGalleryAlbums();
const albums = albumsData.data;

{albums.map(album => (
  <div key={album.id}>
    <img src={album.cover_image} alt={album.title} />
    <h3>{album.title}</h3>
    <p>{album.photos_count} photos</p>
    <Link href={`/gallery/${album.id}`}>View Album</Link>
  </div>
))}

// Single album page
const albumData = await api.getGalleryAlbum(id);
const { album, photos } = albumData.data;

<div>
  <h1>{album.title}</h1>
  <div className="grid">
    {photos.map(photo => (
      <img key={photo.id} src={photo.image_url} alt={photo.title} />
    ))}
  </div>
</div>
```

---

## 🔧 COMPLETE API SERVICE CODE

```javascript
// src/lib/api.js - COMPLETE VERSION
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class ApiService {
  async get(endpoint) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        cache: 'no-store', // For Next.js 13+ Server Components
      });
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  }

  // PHASE 1: Core Site
  getMenu = (location = 'header') => this.get(`/menu/${location}`);
  getFooter = () => this.get('/footer');
  getSocialMedia = () => this.get('/social-media');

  // PHASE 2: Homepage
  getHomepage = () => this.get('/homepage');
  getTestimonials = () => this.get('/testimonials');
  getFeaturedTestimonials = () => this.get('/testimonials/featured');
  getHero = (page) => this.get(`/heroes/${page}`);

  // PHASE 3: Content
  getBlog = (page = 1) => this.get(`/blog?page=${page}`);
  getBlogPost = (slug) => this.get(`/blog/${slug}`);
  getEvents = () => this.get('/events');
  getEvent = (id) => this.get(`/events/${id}`);
  getGalleryAlbums = () => this.get('/gallery/albums');
  getGalleryAlbum = (id) => this.get(`/gallery/albums/${id}`);
  getRecentPhotos = () => this.get('/gallery/recent');

  // Existing APIs
  getPrograms = () => this.get('/programs');
  getProgramBySlug = (slug) => this.get(`/programs/${slug}`);
  getCategories = () => this.get('/program-categories');
  getTeam = () => this.get('/team');
  getPartners = () => this.get('/partners');
  getFAQs = () => this.get('/faqs');
  getCompany = () => this.get('/company');

  // Forms
  submitContact = (data) => this.post('/contact', data);
  subscribeNewsletter = (email) => this.post('/newsletter/subscribe', { email });
  submitDonation = (data) => this.post('/donations/request', data);
}

export const api = new ApiService();
```

---

## 📋 ERROR HANDLING

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Technical details"
}
```

**Usage with Error Handling:**
```javascript
try {
  const data = await api.getHomepage();
  if (data.success) {
    // Use data.data
  }
} catch (error) {
  console.error('Failed to load homepage:', error);
  // Show error UI
}
```

---

## ✅ INTEGRATION CHECKLIST

### Backend Setup:
- [x] All APIs working
- [x] Sample data seeded
- [x] CORS configured

### Frontend Setup:
- [ ] Add API_URL to `.env.local`
- [ ] Create `src/lib/api.js` file
- [ ] Test API connection

### Pages to Update:
- [ ] Homepage (`app/page.js`)
- [ ] Header (`components/Header.jsx`)
- [ ] Footer (`components/Footer.jsx`)
- [ ] Programs (`app/programs/page.js`)
- [ ] Blog (`app/blog/page.js`)
- [ ] Events (`app/events/page.js`)
- [ ] Gallery (`app/gallery/page.js`)
- [ ] About (`app/about/page.js`)
- [ ] Contact (`app/contact/page.js`)

---

## 🎉 YOU HAVE 25+ WORKING ENDPOINTS!

**All documented above!**  
**All tested and ready!**  
**Go integrate and build!**  

**Questions? Check the response examples above!** 🚀
