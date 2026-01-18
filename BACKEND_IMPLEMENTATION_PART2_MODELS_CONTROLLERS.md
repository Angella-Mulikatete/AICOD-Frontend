# 🚀 BACKEND IMPLEMENTATION PART 2 - Models & Controllers

**Continued from Part 1 (Migrations)**

---

## 📦 STEP 3: CREATE MODELS

### 3.1 Blog Models

**File:** `app/Models/BlogCategory.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(BlogPost::class, 'category_id');
    }
}
```

**File:** `app/Models/BlogTag.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BlogTag extends Model
{
    protected $fillable = ['name', 'slug'];

    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(BlogPost::class, 'blog_post_tag');
    }
}
```

**File:** `app/Models/BlogPost.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class BlogPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'featured_image',
        'category_id',
        'author_id',
        'is_featured',
        'is_published',
        'views',
        'published_at',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(BlogTag::class, 'blog_post_tag');
    }

    public function incrementViews()
    {
        $this->increment('views');
    }
}
```

### 3.2 Event Model

**File:** `app/Models/Event.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'featured_image',
        'start_date',
        'end_date',
        'start_time',
        'end_time',
        'location',
        'address',
        'is_online',
        'meeting_link',
        'registration_url',
        'max_participants',
        'current_participants',
        'is_featured',
        'status',
    ];

    protected $casts = [
        'is_online' => 'boolean',
        'is_featured' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function getAvailableSlotsAttribute()
    {
        if (!$this->max_participants) {
            return null;
        }
        return max(0, $this->max_participants - $this->current_participants);
    }

    public function getIsFullAttribute()
    {
        if (!$this->max_participants) {
            return false;
        }
        return $this->current_participants >= $this->max_participants;
    }
}
```

### 3.3 Gallery Models

**File:** `app/Models/GalleryAlbum.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GalleryAlbum extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function photos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class, 'album_id');
    }

    public function getPhotosCountAttribute()
    {
        return $this->photos()->count();
    }
}
```

**File:** `app/Models/GalleryPhoto.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GalleryPhoto extends Model
{
    protected $fillable = [
        'album_id',
        'title',
        'description',
        'image_url',
        'thumbnail_url',
        'order',
    ];

    public function album(): BelongsTo
    {
        return $this->belongsTo(GalleryAlbum::class, 'album_id');
    }
}
```

### 3.4 Other Models

**File:** `app/Models/Testimonial.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name',
        'position',
        'organization',
        'testimonial',
        'photo',
        'rating',
        'is_featured',
        'is_active',
        'order',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];
}
```

**File:** `app/Models/HomepageHero.php`, `app/Models/Statistic.php`, etc.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomepageHero extends Model
{
    protected $fillable = [
        'title', 'subtitle', 'background_image', 'background_video',
        'cta_primary_text', 'cta_primary_link',
        'cta_secondary_text', 'cta_secondary_link', 'is_active'
    ];

    protected $casts = ['is_active' => 'boolean'];
}

class Statistic extends Model
{
    protected $fillable = [
        'label', 'value', 'icon', 'color', 'suffix', 'prefix', 'order', 'is_active'
    ];

    protected $casts = ['is_active' => 'boolean'];

    public function getFormattedValueAttribute()
    {
        $value = $this->value;
        if ($value >= 1000) {
            $value = round($value / 1000) . 'K';
        }
        return ($this->prefix ?? '') . $value . ($this->suffix ?? '');
    }
}

class ContentSection extends Model
{
    protected $fillable = [
        'section_key', 'title', 'content', 'image', 'video', 'order', 'is_active'
    ];

    protected $casts = ['is_active' => 'boolean'];
}

class CTASection extends Model
{
    protected $fillable = [
        'title', 'description', 'button_text', 'button_link',
        'background_image', 'background_color', 'order', 'is_active'
    ];

    protected $casts = ['is_active' => 'boolean'];
}
```

---

## 🎮 STEP 4: CREATE CONTROLLERS

### 4.1 Blog Controller

**File:** `app/Http/Controllers/Api/V1/BlogController.php`

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with(['category', 'author', 'tags'])
            ->where('is_published', true)
            ->where('published_at', '<=', now())
            ->orderBy('published_at', 'desc')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $posts->items(),
            'meta' => [
                'total' => $posts->total(),
                'per_page' => $posts->perPage(),
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
            ]
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::with(['category', 'author', 'tags'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $post->incrementViews();

        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }
}
```

### 4.2 Events Controller

**File:** `app/Http/Controllers/Api/V1/EventController.php`

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::orderBy('start_date', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $events
        ]);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $event
        ]);
    }
}
```

### 4.3 Gallery Controller

**File:** `app/Http/Controllers/Api/V1/GalleryController.php`

```php
<?php

namespace App\Http\Controllers\Api\ V1;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;

class GalleryController extends Controller
{
    public function albums()
    {
        $albums = GalleryAlbum::withCount('photos')
            ->where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $albums
        ]);
    }

    public function album($id)
    {
        $album = GalleryAlbum::with('photos')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => [
                'album' => $album,
                'photos' => $album->photos()->orderBy('order')->get()
            ]
        ]);
    }

    public function recent()
    {
        $photos = \App\Models\GalleryPhoto::latest()->take(12)->get();

        return response()->json([
            'success' => true,
            'data' => $photos
        ]);
    }
}
```

### 4.4 Homepage Controller

**File:** `app/Http/Controllers/Api/V1/HomepageController.php`

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\{HomepageHero, Statistic, ContentSection, CTASection, Program};

class HomepageController extends Controller
{
    public function index()
    {
        $hero = HomepageHero::where('is_active', true)->first();
        $statistics = Statistic::where('is_active', true)->orderBy('order')->get();
        $featuredPrograms = Program::where('is_featured', true)
            ->where('is_active', true)
            ->with('category')
            ->take(6)
            ->get();

        $mission = ContentSection::where('section_key', 'mission')->first();
        $vision = ContentSection::where(' section_key', 'vision')->first();
        $values = ContentSection::where('section_key', 'values')->first();
        
        $cta = CTASection::where('is_active', true)->orderBy('order')->first();

        return response()->json([
            'success' => true,
            'data' => [
                'hero' => $hero,
                'statistics' => $statistics,
                'featured_programs' => $featuredPrograms,
                'mission_section' => $mission,
                'vision_section' => $vision,
                'values_section' => $values,
                'cta_section' => $cta,
            ]
        ]);
    }
}
```

### 4.5 Menu, Footer, Testimonials Controllers

**File:** `app/Http/Controllers/Api/V1/MenuController.php`

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Menu;

class MenuController extends Controller
{
    public function show($location)
    {
        $menu = Menu::where('location', $location)
            ->where('is_active', true)
            ->with(['items' => function($q) {
                $q->whereNull('parent_id')
                  ->where('is_active', true)
                  ->orderBy('order')
                  ->with(['children' => function($q2) {
                      $q2->where('is_active', true)->orderBy('order');
                  }]);
            }])
            ->first();

        return response()->json([
            'success' => true,
            'data' => [
                'location' => $location,
                'items' => $menu?->items ?? []
            ]
        ]);
    }
}
```

**File:** `app/Http/Controllers/Api/V1/TestimonialController.php`

```php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    public function featured()
    {
        $testimonials = Testimonial::where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }
}
```

---

## NEXT: Part 3 will have Routes and Seeders...
