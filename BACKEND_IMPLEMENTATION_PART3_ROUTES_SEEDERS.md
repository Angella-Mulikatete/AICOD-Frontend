# 🚀 BACKEND IMPLEMENTATION PART 3 - Routes & Seeders

**Continued from Part 2 (Models & Controllers)**

---

## 🛣️ STEP 5: ADD API ROUTES

**File:** `routes/api.php`

Add these routes to your existing `api.php` file:

```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\{
    BlogController,
    EventController,
    GalleryController,
    HomepageController,
    MenuController,
    TestimonialController,
    FooterController,
    SocialMediaController
};

Route::prefix('v1')->group(function () {
    
    // ===== NEW ROUTES =====
    
    // Homepage
    Route::get('/homepage', [HomepageController::class, 'index']);
    
    // Blog
    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);
    
    // Events
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    
    // Gallery
    Route::get('/gallery/albums', [GalleryController::class, 'albums']);
    Route::get('/gallery/albums/{id}', [GalleryController::class, 'album']);
    Route::get('/gallery/recent', [GalleryController::class, 'recent']);
    
    // Testimonials
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/testimonials/featured', [TestimonialController::class, 'featured']);
    
    // Navigation
    Route::get('/menu/{location}', [MenuController::class, 'show']);
    
    // Footer
    Route::get('/footer', [FooterController::class, 'index']);
    
    // Social Media
    Route::get('/social-media', [SocialMediaController::class, 'index']);
    
    // ===== YOUR EXISTING ROUTES =====
    // Keep all your existing routes here
});
```

---

## 🌱 STEP 6: CREATE SEEDERS

### 6.1 Blog Seeder

**File:** `database/seeders/BlogSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{BlogCategory, BlogTag, BlogPost};
use Illuminate\Support\Str;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        // Create categories
        $categories = [
            ['name' => 'Education', 'slug' => 'education', 'description' => 'Educational initiatives'],
            ['name' => 'Health', 'slug' => 'health', 'description' => 'Health and wellness'],
            ['name' => 'Environment', 'slug' => 'environment', 'description' => 'Environmental conservation'],
            ['name' => 'Impact Stories', 'slug' => 'impact-stories', 'description' => 'Success stories'],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }

        // Create tags
        $tags = ['Community', 'Empowerment', 'Sustainability', 'Innovation', 'Partnership'];
        foreach ($tags as $tag) {
            BlogTag::create([
                'name' => $tag,
                'slug' => Str::slug($tag)
            ]);
        }

        // Create posts
        $posts = [
            [
                'title' => 'New School Opens in Rural Uganda',
                'slug' => 'new-school-opens-rural-uganda',
                'excerpt' => 'Celebrating the opening of our 50th school facility, bringing education to  remote communities.',
                'content' => '<p>We are thrilled to announce the grand opening of our newest school facility in rural Uganda. This marks our 50th school built through community partnerships and donor support.</p><p>The new facility will serve over 300 students and provide quality education to children who previously had to walk hours to reach the nearest school.</p>',
                'category_id' => 1,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(5),
            ],
            [
                'title' => 'Clean Water Initiative Reaches 10,000 Households',
                'slug' => 'clean-water-initiative-milestone',
                'excerpt' => 'Our clean water program has successfully provided access to safe drinking water for 10,000 households.',
                'content' => '<p>A major milestone in our ongoing commitment to improving community health and wellness.</p>',
                'category_id' => 2,
                'is_featured' => true,
                'is_published' => true,
                'published_at' => now()->subDays(10),
            ],
            [
                'title' => 'Tree Planting Campaign: 50,000 Trees and Counting',
                'slug' => 'tree-planting-campaign-success',
                'excerpt' => 'Community members join forces to plant 50,000 trees in environmental conservation effort.',
                'content' => '<p>Our environmental initiative continues to grow with the support of local communities.</p>',
                'category_id' => 3,
                'is_featured' => false,
                'is_published' => true,
                'published_at' => now()->subDays(15),
            ],
        ];

        foreach ($posts as $postData) {
            $post = BlogPost::create($postData);
            // Attach random tags
            $post->tags()->attach([1, 2]);
        }
    }
}
```

### 6.2 Events Seeder

**File:** `database/seeders/EventSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $events = [
            [
                'title' => 'Community Development Workshop 2026',
                'slug' => 'community-development-workshop-2026',
                'description' => 'Join us for a comprehensive 3-day workshop on sustainable community development strategies.',
                'start_date' => now()->addDays(30),
                'end_date' => now()->addDays(32),
                'start_time' => '09:00:00',
                'end_time' => '17:00:00',
                'location' => 'Kampala Conference Center',
                'address' => 'Plot 123, Community Drive, Kampala, Uganda',
                'is_online' => false,
                'max_participants' => 100,
                'current_participants' => 45,
                'status' => 'upcoming',
                'is_featured' => true,
                'registration_url' => 'https://aicod.org/register/workshop-2026',
            ],
            [
                'title' => 'Monthly Partner Meeting - February',
                'slug' => 'monthly-partner-meeting-february',
                'description' => 'Virtual meeting for all AICOD partners to discuss ongoing projects and initiatives.',
                'start_date' => now()->addDays(15),
                'start_time' => '14:00:00',
                'is_online' => true,
                'meeting_link' => 'https://zoom.us/j/example',
                'status' => 'upcoming',
                'is_featured' => false,
            ],
            [
                'title' => 'Health Awareness Campaign',
                'slug' => 'health-awareness-campaign-2026',
                'description' => 'Free health screenings and awareness sessions for community members.',
                'start_date' => now()->addDays(60),
                'location' => 'Community Health Center',
                'is_online' => false,
                'max_participants' => 200,
                'current_participants' => 0,
                'status' => 'upcoming',
                'is_featured' => true,
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
```

### 6.3 Gallery Seeder

**File:** `database/seeders/GallerySeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{GalleryAlbum, GalleryPhoto};

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $albums = [
            [
                'title' => 'School Construction Project 2025',
                'slug' => 'school-construction-2025',
                'description' => 'Photos from our latest school construction project in rural Uganda.',
                'cover_image' => '/images/gallery/school-cover.jpg',
                'order' => 1,
            ],
            [
                'title' => 'Community Health Workshop',
                'slug' => 'community-health-workshop',
                'description' => 'Health and wellness workshop for community leaders.',
                'cover_image' => '/images/gallery/health-cover.jpg',
                'order' => 2,
            ],
            [
                'title' => 'Tree Planting Campaign 2025',
                'slug' => 'tree-planting-2025',
                'description' => 'Environmental conservation through community tree planting.',
                'cover_image' => '/images/gallery/trees-cover.jpg',
                'order' => 3,
            ],
        ];

        foreach ($albums as $albumData) {
            $album = GalleryAlbum::create($albumData);

            // Add 5 sample photos to each album
            for ($i = 1; $i <= 5; $i++) {
                GalleryPhoto::create([
                    'album_id' => $album->id,
                    'title' => "Photo $i from {$album->title}",
                    'description' => "Description for photo $i",
                    'image_url' => "/images/gallery/{$album->slug}/photo-{$i}.jpg",
                    'thumbnail_url' => "/images/gallery/{$album->slug}/thumb-{$i}.jpg",
                    'order' => $i,
                ]);
            }
        }
    }
}
```

### 6.4 Testimonials Seeder

**File:** `database/seeders/TestimonialSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'Sarah Nakato',
                'position' => 'Community Leader',
                'organization' => 'Mbarara Women\'s Group',
                'testimonial' => 'AICOD has transformed our community. The educational programs have given our children hope for a better future.',
                'photo' => '/images/testimonials/sarah.jpg',
                'rating' => 5,
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'name' => 'Dr. James Okello',
                'position' => 'Health Director',
                'organization' => 'Regional Health Authority',
                'testimonial' => 'The health initiatives implemented by AICOD have significantly improved healthcare access in rural areas.',
                'photo' => '/images/testimonials/james.jpg',
                'rating' => 5,
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'name' => 'Grace Auma',
                'position' => 'Teacher',
                'organization' => 'Community Primary School',
                'testimonial' => 'Working with AICOD has been incredible. Their support has enabled us to provide quality education to hundreds of children.',
                'photo' => '/images/testimonials/grace.jpg',
                'rating' => 5,
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
```

### 6.5 Homepage Seeder

**File:** `database/seeders/HomepageSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{HomepageHero, Statistic, ContentSection, CTASection};

class HomepageSeeder extends Seeder
{
    public function run(): void
    {
        // Hero
        HomepageHero::create([
            'title' => 'Empowering Communities Across Africa',
            'subtitle' => 'Building sustainable futures through education, health, and community development',
            'background_image' => '/images/hero-bg.jpg',
            'cta_primary_text' => 'Get Involved',
            'cta_primary_link' => '/programs',
            'cta_secondary_text' => 'Donate Now',
            'cta_secondary_link' => '/donations',
            'is_active' => true,
        ]);

        // Statistics
        $stats = [
            ['label' => 'Communities Reached', 'value' => 150, 'icon' => 'users', 'color' => '#10b981', 'suffix' => '+'],
            ['label' => 'Lives Impacted', 'value' => 5000, 'icon' => 'heart', 'color' => '#3b82f6', 'suffix' => '+'],
            ['label' => 'Schools Built', 'value' => 50, 'icon' => 'building', 'color' => '#f59e0b', 'suffix' => '+'],
            ['label' => 'Years of Service', 'value' => 12, 'icon' => 'clock', 'color' => '#8b5cf6', 'suffix' => '+'],
        ];

        foreach ($stats as $index => $stat) {
            Statistic::create(array_merge($stat, ['order' => $index + 1]));
        }

        // Content Sections
        ContentSection::create([
            'section_key' => 'mission',
            'title' => 'Our Mission',
            'content' => '<p>To empower African communities through sustainable development initiatives in education, health, and environmental conservation.</p>',
            'order' => 1,
        ]);

        ContentSection::create([
            'section_key' => 'vision',
            'title' => 'Our Vision',
            'content' => '<p>A thriving Africa where every community has access to quality education, healthcare, and opportunities for sustainable development.</p>',
            'order' => 2,
        ]);

        // CTA
        CTASection::create([
            'title' => 'Make a Difference Today',
            'description' => 'Your support helps us create lasting change in communities across Africa.',
            'button_text' => 'Donate Now',
            'button_link' => '/donations',
            'background_color' => '#2563eb',
            'order' => 1,
        ]);
    }
}
```

### 6.6 Menu Seeder

**File:** `database/seeders/MenuSeeder.php`

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Menu, MenuItem};

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Header Menu
        $headerMenu = Menu::create([
            'name' => 'Header Navigation',
            'location' => 'header',
        ]);

        $menuItems = [
            ['label' => 'Home', 'url' => '/', 'order' => 1],
            ['label' => 'About', 'url' => '/about', 'order' => 2],
            ['label' => 'Programs', 'url' => '/programs', 'order' => 3],
            ['label' => 'Team', 'url' => '/team', 'order' => 4],
            ['label' => 'Blog', 'url' => '/blog', 'order' => 5],
            ['label' => 'Events', 'url' => '/events', 'order' => 6],
            ['label' => 'Gallery', 'url' => '/gallery', 'order' => 7],
            ['label' => 'Contact', 'url' => '/contact', 'order' => 8],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create(array_merge($item, ['menu_id' => $headerMenu->id]));
        }

        // Footer Menu
        $footerMenu = Menu::create([
            'name' => 'Footer Navigation',
            'location' => 'footer',
        ]);

        $footerItems = [
            ['label' => 'Privacy Policy', 'url' => '/privacy', 'order' => 1],
            ['label' => 'Terms of Service', 'url' => '/terms', 'order' => 2],
           ['label' => 'Partners', 'url' => '/partners', 'order' => 3],
        ];

        foreach ($footerItems as $item) {
            MenuItem::create(array_merge($item, ['menu_id' => $footerMenu->id]));
        }
    }
}
```

---

## 🏃 STEP 7: RUN ALL SEEDERS

**File:** `database/seeders/DatabaseSeeder.php`

Update your main seeder:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // Your existing seeders
            
            // New seeders
            BlogSeeder::class,
            EventSeeder::class,
            GallerySeeder::class,
            TestimonialSeeder::class,
            HomepageSeeder::class,
            MenuSeeder::class,
        ]);
    }
}
```

**Run seeders:**

```bash
php artisan db:seed
# Or seed specific seeder:
php artisan db:seed --class=BlogSeeder
```

---

## ✅ TESTING YOUR ENDPOINTS

Test in browser or Postman:

```
http://localhost:8000/api/v1/homepage
http://localhost:8000/api/v1/blog
http://localhost:8000/api/v1/events
http://localhost:8000/api/v1/gallery/albums
http://localhost:8000/api/v1/testimonials/featured
http://localhost:8000/api/v1/menu/header
```

---

## 🎉 YOU'RE DONE!

All endpoints are now ready for the frontend to consume!

**Next:** Create Filament resources to manage all this content (Part 4)
