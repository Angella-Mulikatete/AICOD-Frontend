/**
 * AICOD Complete API Service (Updated)
 * 
 * This is the updated API service with ALL endpoints including:
 * - Existing endpoints (programs, team, partners, etc.)
 * - New dynamic content endpoints (settings, menu, homepage, footer, etc.)
 * 
 * Use this file to replace src/lib/api.ts once backend implements all endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    meta?: {
        total?: number;
        per_page?: number;
        current_page?: number;
    };
}

// --- Site Settings ---
export interface SiteSettings {
    site_name: string;
    site_title: string;
    tagline?: string;
    logo?: string;
    logo_white?: string;
    favicon?: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    email: string;
    phone?: string;
    address?: string;
    working_hours?: string;
    google_analytics_id?: string;
    meta_keywords?: string;
    meta_description?: string;
    copyright_text?: string;
    is_maintenance_mode: boolean;
}

// --- Navigation Menu ---
export interface MenuItem {
    id: number;
    label: string;
    url: string;
    type: 'internal' | 'external' | 'page';
    order: number;
    parent_id: number | null;
    icon?: string;
    open_new_tab: boolean;
    children?: MenuItem[];
}

export interface Menu {
    location: string;
    items: MenuItem[];
}

// --- Homepage Content ---
export interface HeroSection {
    id: number;
    title: string;
    subtitle?: string;
    background_image?: string;
    background_video?: string;
    cta_primary_text?: string;
    cta_primary_link?: string;
    cta_secondary_text?: string;
    cta_secondary_link?: string;
    overlay_opacity: number;
}

export interface Statistic {
    id: number;
    label: string;
    value: number;
    icon?: string;
    suffix?: string;
    prefix?: string;
    order: number;
}

export interface ContentSection {
    id: number;
    section_key: string;
    title: string;
    content: string;
    image?: string;
    video?: string;
    order: number;
}

export interface CTASection {
    id: number;
    title: string;
    description?: string;
    button_text: string;
    button_link: string;
    background_image?: string;
    background_color?: string;
    order: number;
}

export interface HomepageContent {
    hero: HeroSection;
    featured_programs: Program[];
    statistics: Statistic[];
    mission_section?: ContentSection;
    vision_section?: ContentSection;
    cta_section: CTASection;
}

// --- Footer ---
export interface FooterLink {
    label: string;
    url: string;
    order: number;
}

export interface ContactInfo {
    email: string;
    phone?: string;
    address?: string;
    working_hours?: string;
}

export interface SocialMedia {
    id: number;
    platform: string;
    username?: string;
    url: string;
    icon?: string;
    color?: string;
    follower_count?: number;
    order: number;
}

export interface PaymentMethod {
    name: string;
    icon: string;
}

export interface FooterData {
    about_text: string;
    logo?: string;
    quick_links: FooterLink[];
    programs_links: FooterLink[];
    legal_links: FooterLink[];
    contact_info: ContactInfo;
    social_media: SocialMedia[];
    newsletter_enabled: boolean;
    copyright_text: string;
    payment_methods?: PaymentMethod[];
}

// --- Testimonials ---
export interface Testimonial {
    id: number;
    name: string;
    position?: string;
    organization?: string;
    testimonial: string;
    photo?: string;
    rating: number;
    is_featured: boolean;
    order: number;
    created_at: string;
}

// --- Blog ---
export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: string;
    author?: {
        id: number;
        name: string;
        photo?: string;
    };
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    tags?: string[];
    published_at: string;
    is_featured: boolean;
    views: number;
}

// --- Events ---
export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    start_date: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    location?: string;
    address?: string;
    featured_image?: string;
    max_participants?: number;
    current_participants: number;
    registration_url?: string;
    is_online: boolean;
    meeting_link?: string;
    is_featured: boolean;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// --- Gallery ---
export interface GalleryAlbum {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    photos_count: number;
    created_at: string;
}

export interface GalleryPhoto {
    id: number;
    title: string;
    description?: string;
    image_url: string;
    thumbnail_url?: string;
    album_id: number;
    order: number;
}

export interface GalleryData {
    albums: GalleryAlbum[];
    recent_photos: GalleryPhoto[];
}

// --- SEO ---
export interface SEOMetadata {
    page: string;
    title: string;
    description: string;
    keywords?: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    twitter_card: string;
    canonical_url?: string;
}

// --- Existing Types (from original api.ts) ---
export interface Program {
    id: number;
    title: string;
    slug: string;
    description: string;
    long_description?: string;
    objectives?: string;
    category_id: number;
    category?: ProgramCategory;
    target_beneficiaries?: number;
    status: string;
    start_date?: string;
    end_date?: string;
    budget?: number;
    featured_image?: string;
    is_featured: boolean;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

export interface ProgramCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    order: number;
    is_active: boolean;
    programs_count?: number;
}

export interface TeamMember {
    id: number;
    name: string;
    slug: string;
    position: string;
    department?: string;
    bio?: string;
    photo?: string;
    email?: string;
    phone?: string;
    linkedin_url?: string;
    twitter_url?: string;
    order: number;
    is_active: boolean;
}

export interface Partner {
    id: number;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    type?: string;
    order: number;
    is_active: boolean;
}

export interface Page {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    template?: string;
    featured_image?: string;
    meta_title?: string;
    meta_description?: string;
    is_active: boolean;
    show_in_menu: boolean;
    menu_title?: string;
    published_at?: string;
    sections?: PageSection[];
}

export interface PageSection {
    id: number;
    title?: string;
    content: string;
    section_type: string;
    order: number;
}

export interface Company {
    id: number;
    name: string;
    full_name?: string;
    tagline?: string;
    description?: string;
    mission?: string;
    vision?: string;
    email: string;
    phone?: string;
    address?: string;
    website?: string;
    founded_year?: number;
    registration_number?: string;
    is_active: boolean;
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: string;
    order: number;
    is_active: boolean;
}

export interface Media {
    id: number;
    title: string;
    file_path: string;
    file_type: string;
    category?: string;
    description?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    category?: 'general' | 'partnership' | 'volunteer' | 'complaint' | 'suggestion';
}

export interface NewsletterSubscription {
    email: string;
}

export interface DonationRequest {
    donor_name: string;
    email: string;
    phone?: string;
    organization?: string;
    amount_proposed?: number;
    currency?: 'USD' | 'UGX' | 'EUR' | 'GBP';
    donation_type?: 'one-time' | 'monthly' | 'yearly';
    purpose?: string;
    message?: string;
}

// ============================================
// API SERVICE
// ============================================

async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            console.error('API Error:', data.message);
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    // Base methods
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return fetchApi<T>(endpoint, { method: 'GET' });
    },

    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return fetchApi<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // ===== NEW ENDPOINTS =====

    // Site Settings
    getSettings: () => api.get<SiteSettings>('/settings'),

    // Navigation Menu
    getMenu: (location: string) => api.get<Menu>(`/menu/${location}`),
    getHeaderMenu: () => api.get<Menu>('/menu/header'),
    getFooterMenu: () => api.get<Menu>('/menu/footer'),
    getMobileMenu: () => api.get<Menu>('/menu/mobile'),

    // Homepage
    getHomepage: () => api.get<HomepageContent>('/homepage'),

    // Footer
    getFooter: () => api.get<FooterData>('/footer'),

    // Testimonials
    getTestimonials: () => api.get<Testimonial[]>('/testimonials'),

    // Blog
    getBlogPosts: (page?: number) => api.get<BlogPost[]>(`/blog?page=${page || 1}`),
    getBlogPost: (slug: string) => api.get<BlogPost>(`/blog/${slug}`),

    // Events
    getEvents: () => api.get<Event[]>('/events'),
    getEvent: (id: number) => api.get<Event>(`/events/${id}`),

    // Gallery
    getGallery: () => api.get<GalleryData>('/gallery'),
    getGalleryAlbums: () => api.get<GalleryAlbum[]>('/gallery/albums'),
    getGalleryAlbum: (id: number) => api.get<GalleryAlbum>(`/gallery/albums/${id}`),

    // Heroes
    getHero: (page: string) => api.get<HeroSection>(`/heroes/${page}`),

    // Social Media
    getSocialMedia: () => api.get<SocialMedia[]>('/social-media'),

    // SEO
    getSEO: (page: string) => api.get<SEOMetadata>(`/seo/${page}`),

    // ===== EXISTING ENDPOINTS =====

    // Programs
    getPrograms: () => api.get<Program[]>('/programs'),
    getProgram: (slug: string) => api.get<Program>(`/programs/${slug}`),

    // Program Categories
    getProgramCategories: () => api.get<ProgramCategory[]>('/program-categories'),
    getProgramCategory: (slug: string) => api.get<ProgramCategory>(`/program-categories/${slug}`),

    // Team
    getTeam: () => api.get<TeamMember[]>('/team'),
    getTeamMember: (id: number) => api.get<TeamMember>(`/team/${id}`),

    // Partners
    getPartners: () => api.get<Partner[]>('/partners'),

    // Pages
    getPages: () => api.get<Page[]>('/pages'),
    getPage: (slug: string) => api.get<Page>(`/pages/${slug}`),

    // Company
    getCompany: () => api.get<Company>('/company'),

    // FAQs
    getFAQs: () => api.get<FAQ[]>('/faqs'),

    // Media
    getMedia: () => api.get<Media[]>('/media'),

    // Forms
    submitContact: (data: ContactFormData) =>
        api.post<{ id: number; reference_number: string }>('/contact', data),

    subscribeNewsletter: (email: string) =>
        api.post<{ message: string }>('/newsletter/subscribe', { email }),

    submitDonation: (data: DonationRequest) =>
        api.post<{ id: number; reference_number: string }>('/donations/request', data),
};

// Helper function to get full URL for media/images
export function getMediaUrl(path: string | null | undefined): string {
    if (!path) return '/placeholder.jpg';

    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // Otherwise, prepend the backend base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';
    return `${baseUrl}${path}`;
}

export default api;
