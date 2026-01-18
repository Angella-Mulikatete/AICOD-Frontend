# 🚀 BACKEND IMPLEMENTATION GUIDE - Complete Dynamic Website

**For:** Backend Developer  
**From:** Frontend Team  
**Date:** January 18, 2026

This guide contains **everything** needed to make the AICOD website fully dynamic.

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Migration Files](#migration-files)
3. [Model Files](#model-files)
4. [Controller Files](#controller-files)
5. [API Routes](#api-routes)
6. [Seeder Files](#seeder-files)
7. [Filament Resources](#filament-resources)
8. [Testing](#testing)

---

## 🎯 OVERVIEW

### What Needs to Be Added:

| Feature | Tables | Endpoints | Priority |
|---------|--------|-----------|----------|
| **Navigation Menu** | `menus`, `menu_items` | `/menu/{location}` | HIGH |
| **Homepage** | `homepage_content`, `statistics`, `content_sections` | `/homepage` | HIGH |
| **Blog** | `blog_posts`, `blog_categories`, `blog_tags` | `/blog`, `/blog/{slug}` | HIGH |
| **Events** | `events` | `/events`, `/events/{id}` | HIGH |
| **Gallery** | `gallery_albums`, `gallery_photos` | `/gallery/albums` | MEDIUM |
| **Testimonials** | `testimonials` | `/testimonials` | MEDIUM |
| **Footer** | `footer_settings` | `/footer` | LOW |
| **Social Media** | `social_media_links` | `/social-media` | LOW |

---

## 📁 STEP 1: CREATE MIGRATIONS

### 1.1 Blog System

**File:** `database/migrations/2026_01_18_000001_create_blog_categories_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->foreignId('category_id')->nullable()->constrained('blog_categories')->nullOnDelete();
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(false);
            $table->integer('views')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('blog_post_tag', function (Blueprint $table) {
            $table->foreignId('blog_post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('blog_tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['blog_post_id', 'blog_tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_post_tag');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_categories');
    }
};
```

### 1.2 Events System

**File:** `database/migrations/2026_01_18_000002_create_events_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('featured_image')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->time('start_time')->nullable();
            $table->time('end_time')->nullable();
            $table->string('location')->nullable();
            $table->text('address')->nullable();
            $table->boolean('is_online')->default(false);
            $table->string('meeting_link')->nullable();
            $table->string('registration_url')->nullable();
            $table->integer('max_participants')->nullable();
            $table->integer('current_participants')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['upcoming', 'ongoing', 'completed', 'cancelled'])->default('upcoming');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
```

### 1.3 Gallery System

**File:** `database/migrations/2026_01_18_000003_create_gallery_tables.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gallery_albums', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('gallery_photos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained('gallery_albums')->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('image_url');
            $table->string('thumbnail_url')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_photos');
        Schema::dropIfExists('gallery_albums');
    }
};
```

### 1.4 Testimonials

**File:** `database/migrations/2026_01_18_000004_create_testimonials_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable();
            $table->string('organization')->nullable();
            $table->text('testimonial');
            $table->string('photo')->nullable();
            $table->integer('rating')->default(5);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
```

### 1.5 Homepage Content

**File:** `database/migrations/2026_01_18_000005_create_homepage_tables.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('homepage_heroes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('background_image')->nullable();
            $table->string('background_video')->nullable();
            $table->string('cta_primary_text')->nullable();
            $table->string('cta_primary_link')->nullable();
            $table->string('cta_secondary_text')->nullable();
            $table->string('cta_secondary_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('statistics', function (Blueprint $table) {
            $table->id();
            $table->string('label');
            $table->integer('value');
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->string('suffix')->nullable();
            $table->string('prefix')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('content_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_key')->unique();
            $table->string('title');
            $table->longText('content');
            $table->string('image')->nullable();
            $table->string('video')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('cta_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('button_text');
            $table->string('button_link');
            $table->string('background_image')->nullable();
            $table->string('background_color')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cta_sections');
        Schema::dropIfExists('content_sections');
        Schema::dropIfExists('statistics');
        Schema::dropIfExists('homepage_heroes');
    }
};
```

### 1.6 Navigation Menus

**File:** `database/migrations/2026_01_18_000006_create_menu_tables.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location')->unique(); // header, footer, mobile
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('menu_items')->cascadeOnDelete();
            $table->string('label');
            $table->string('url');
            $table->enum('type', ['internal', 'external', 'page'])->default('internal');
            $table->string('icon')->nullable();
            $table->boolean('open_new_tab')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('menus');
    }
};
```

### 1.7 Footer & Social Media

**File:** `database/migrations/2026_01_18_000007_create_footer_and_social_tables.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            $table->text('about_text');
            $table->string('logo')->nullable();
            $table->json('quick_links')->nullable();
            $table->json('programs_links')->nullable();
            $table->json('legal_links')->nullable();
            $table->boolean('newsletter_enabled')->default(true);
            $table->string('copyright_text');
            $table->timestamps();
        });

        Schema::create('social_media_links', function (Blueprint $table) {
            $table->id();
            $table->string('platform');
            $table->string('username')->nullable();
            $table->string('url');
            $table->string('icon')->nullable();
            $table->string('color')->nullable();
            $table->integer('follower_count')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_media_links');
        Schema::dropIfExists('footer_settings');
    }
};
```

---

## 🏃 STEP 2: RUN MIGRATIONS

```bash
php artisan migrate
```

---

## CONTINUE IN NEXT FILE...

This is getting long. I'll create multiple files for:
- Part 2: Models
- Part 3: Controllers  
- Part 4: Routes
- Part 5: Seeders
- Part 6: Filament Resources

Creating Part 2 now...
