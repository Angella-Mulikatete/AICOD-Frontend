# 🚀 AICOD Frontend Integration Guide

**Date:** January 22, 2026
**Version:** 1.0 (Production Ready)

---

## 📋 Executive Summary
The AICOD backend is now fully operational and production-ready. We have reverted to the secure, standard Filament login system, implemented a complete Role-Based Access Control (RBAC) system with 29+ managed resources, and finalized all 40+ API endpoints required by your frontend application.

---

## 🔗 Endpoint Reference
Base URL: `https://api.aicod.org/api/v1` (or `http://localhost:8000/api/v1` locally)

### 1. Dynamic Website Content
These endpoints drive the public-facing Next.js website.

| Feature | Endpoint | Method | Response Type |
| :--- | :--- | :--- | :--- |
| **Homepage** | `/homepage` | `GET` | `HomepageContent` (Heroes, Stats, CTA) |
| **Navigation** | `/menu/{location}` | `GET` | `Menu` (Header/Footer/Mobile) |
| **Footer** | `/footer` | `GET` | `FooterData` (Links, Contact, Socials) |
| **Settings** | `/settings` | `GET` | `SiteSettings` (Logo, Colors, SEO) |
| **SEO** | `/seo/{page}` | `GET` | `SEOMetadata` (Meta tags, OG Image) |

### 2. Core Modules
| Feature | List Endpoint | Detail Endpoint | Key Fields |
| :--- | :--- | :--- | :--- |
| **Programs** | `/programs` | `/programs/{slug}` | title, content, gallery, category |
| **Events** | `/events` | `/events/{id}` | date, location, registration_url |
| **Blog** | `/blog` | `/blog/{slug}` | author, tags, content, image |
| **Gallery** | `/gallery` | `/gallery/albums/{id}` | albums, recent_photos |
| **Team** | `/team` | `/team/{id}` | photo, bio, social_links |
| **Partners** | `/partners` | - | logo, website_url |


### 3. Standard Pages
Use `/pages/{slug}` to fetch content for these standard pages:
*   **About Us**: `about`
*   **Our Story**: `our-story`
*   **Contact**: `contact`
*   **Get Involved**: `get-involved`
*   **Donate**: `donate`
*   **Impact**: `impact`

### 4. Interactive Features
| Feature | Endpoint | Method | Payload |
| :--- | :--- | :--- | :--- |
| **Contact Form** | `/contact` | `POST` | `{ name, email, subject, message }` |
| **Newsletter** | `/newsletter/subscribe` | `POST` | `{ email }` |
| **Donations** | `/donations/request` | `POST` | `{ name, amount, currency, purpose }` |

---

## 🎨 Image & Media Handling
All image URLs returned by the API are now standardized.
*   **Prefix**: If an image path identifies as local (e.g., `programs/image.jpg`), prepend `https://api.aicod.org/storage/`.
*   **Absolute**: If an image path starts with `http`, use it as-is.
*   **Fallback**: The API service `getMediaUrl()` function handles placeholders automatically.

---

## 🔐 Security & Access Control
*   **Authentication**: Uses standard Laravel Sanctum.
*   **Super Admin**: `superadmin@aicod.org` (Has full system access bypass).
*   **Role Permissions**:
    *   `Content Manager`: Can edit Programs, Pages, Blog, Events.
    *   `Communications Officer`: Can manage Newsletter, Messages, Donations.
*   **Login**: The admin monitoring dashboard is at `/admin`.

---

## 🛠️ Data Seeding Instructions
To reset the system with fresh demo data:

1.  **Clear Database**:
    ```bash
    php artisan migrate:fresh
    ```

2.  **Run All Seeders**:
    ```bash
    php artisan db:seed
    ```
    *This runs: Roles, Permissions, Programs, Pages, FAQs, Settings, Blogs, Events, Gallery.*

3.  **Clear Cache**:
    ```bash
    php artisan optimize:clear
    ```

---

## ✅ Final Production Checklist
1.  **Environment**: Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`.
2.  **Storage**: Run `php artisan storage:link` on the server.
3.  **Build**: Run `npm run build` to compile assets.
4.  **Queues**: Ensure the queue worker is running for email dispatching.

**Ready for Launch!** 🚀
