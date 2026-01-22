/**
 * AICOD Complete API Service
 * Handles all API calls to the Laravel backend
 * Base URL: http://localhost:8000/api/v1 (development)
 * Production URL: https://api.aicod.org/api/v1
 * 
 * Updated: January 18, 2026
 * Includes: 25+ endpoints for fully dynamic website
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Types for API responses
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}

// Settings Types
export interface SiteSettings {
    site_name: string;
    logo?: string;
    favicon?: string;
    primary_color?: string;
    secondary_color?: string;
    description?: string;
}

// SEO Types
export interface SEOMetadata {
    title: string;
    description: string;
    keywords?: string;
    og_image?: string;
    twitter_card?: string;
}

// Program Types
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

// Team Types
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

// Partner Types
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

// Page Types
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

// Company Types
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

// FAQ Types
export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category?: string;
    order: number;
    is_active: boolean;
}

// Media Types
export interface Media {
    id: number;
    title: string;
    file_path: string;
    file_type: string;
    category?: string;
    description?: string;
}

// Form Types
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

// ==== NEW TYPES FOR DYNAMIC WEBSITE ====

// Menu & Navigation Types
export interface MenuItem {
    id: number;
    label: string;
    url: string;
    type: 'internal' | 'external' | 'page';
    icon?: string;
    open_new_tab: boolean;
    children: MenuItem[];
}

export interface Menu {
    location: string;
    items: MenuItem[];
}

// Footer Types
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

export interface FooterData {
    about_text: string;
    logo?: string;
    quick_links: FooterLink[];
    programs_links?: FooterLink[];
    legal_links?: FooterLink[];
    contact_info: ContactInfo;
    social_media: SocialMedia[];
    newsletter_enabled: boolean;
    copyright_text: string;
}

// Social Media Types
export interface SocialMedia {
    id: number;
    platform: string;
    username?: string;
    url: string;
    icon?: string;
    color?: string;
    follower_count?: number;
    formatted_follower_count?: string;
}

// Homepage Types
export interface HeroSection {
    title: string;
    subtitle?: string;
    background_image?: string;
    background_video?: string;
    cta_primary_text?: string;
    cta_primary_link?: string;
    cta_secondary_text?: string;
    cta_secondary_link?: string;
}

export interface Statistic {
    label: string;
    value: number;
    formatted_value: string;
    icon?: string;
    color?: string;
}

export interface ContentSection {
    title: string;
    content: string;
    image?: string;
    video?: string;
}

export interface CTASection {
    title: string;
    description?: string;
    button_text: string;
    button_link: string;
    background_image?: string;
}

export interface HomepageContent {
    hero: HeroSection;
    featured_programs: Program[];
    statistics: Statistic[];
    mission_section?: ContentSection;
    vision_section?: ContentSection;
    values_section?: ContentSection;
    cta_section: CTASection;
}

// Testimonials Types
export interface Testimonial {
    id: number;
    name: string;
    position?: string;
    organization?: string;
    testimonial: string;
    photo?: string;
    rating: number;
    is_featured: boolean;
}

// Blog Types
export interface BlogAuthor {
    id: number;
    name: string;
    photo?: string;
}

export interface BlogCategory {
    id: number;
    name: string;
    slug: string;
}

export interface BlogTag {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content?: string;
    featured_image?: string;
    author?: BlogAuthor;
    category?: BlogCategory;
    tags?: BlogTag[];
    views: number;
    is_featured: boolean;
    published_at: string;
}

// Events Types
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
    is_online: boolean;
    meeting_link?: string;
    status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
    available_slots?: number;
    is_full?: boolean;
}

// Gallery Types
export interface GalleryAlbum {
    id: number;
    title: string;
    slug: string;
    description?: string;
    cover_image?: string;
    photos_count: number;
    created_at?: string;
}

export interface GalleryPhoto {
    id: number;
    title: string;
    description?: string;
    image_url: string;
    thumbnail_url?: string;
}

export interface GalleryAlbumDetail {
    album: GalleryAlbum;
    photos: GalleryPhoto[];
}


// Generic fetch wrapper with error handling
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

// API Service Object
export const api = {
    // GET requests
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return fetchApi<T>(endpoint, { method: 'GET' });
    },

    // POST requests
    async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
        return fetchApi<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

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

    // ==== NEW DYNAMIC WEBSITE ENDPOINTS ====

    // Navigation Menu
    getMenu: (location: 'header' | 'footer' | 'mobile' = 'header') =>
        api.get<Menu>(`/menu/${location}`),
    getHeaderMenu: () => api.get<Menu>('/menu/header'),
    getFooterMenu: () => api.get<Menu>('/menu/footer'),
    getMobileMenu: () => api.get<Menu>('/menu/mobile'),

    // Footer
    getFooter: () => api.get<FooterData>('/footer'),

    // Settings & SEO
    getSettings: () => api.get<SiteSettings>('/settings'),
    getSeo: (page: string) => api.get<SEOMetadata>(`/seo/${page}`),


    // Social Media
    getSocialMedia: () => api.get<SocialMedia[]>('/social-media'),

    // Homepage (Complete homepage data in one call!)
    getHomepage: () => api.get<HomepageContent>('/homepage'),

    // Testimonials
    getTestimonials: () => api.get<Testimonial[]>('/testimonials'),
    getFeaturedTestimonials: () => api.get<Testimonial[]>('/testimonials/featured'),

    // Hero Sections (for any page)
    getHero: (page: string) => api.get<HeroSection>(`/heroes/${page}`),

    // Blog
    getBlog: (page: number = 1) => api.get<BlogPost[]>(`/blog?page=${page}`),
    getBlogPost: (slug: string) => api.get<BlogPost>(`/blog/${slug}`),

    // Events
    getEvents: () => api.get<Event[]>('/events'),
    getEvent: (id: number) => api.get<Event>(`/events/${id}`),

    // Gallery
    getGalleryAlbums: () => api.get<GalleryAlbum[]>('/gallery/albums'),
    getGalleryAlbum: (id: number) => api.get<GalleryAlbumDetail>(`/gallery/albums/${id}`),
    getRecentPhotos: () => api.get<GalleryPhoto[]>('/gallery/recent'),
};

// Helper function to get full URL for media/images
export function getMediaUrl(path: string | null | undefined, fallbackType: 'hero' | 'program' | 'team' | 'blog' | 'event' | 'gallery' = 'program'): string {
    // If no path provided, return beautiful default images based on type
    if (!path) {
        const defaults = {
            hero: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop', // Africa community
            program: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop', // Community work
            team: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', // Professional
            blog: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=600&fit=crop', // Reading/writing
            event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', // Events/meetings
            gallery: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=600&fit=crop', // Africa landscape
        };
        return defaults[fallbackType];
    }

    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // Get backend base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

    // If path starts with /, it's already absolute
    if (path.startsWith('/')) {
        return `${baseUrl}${path}`;
    }

    // Otherwise, it's a storage path - add /storage/ prefix
    return `${baseUrl}/storage/${path}`;
}

export default api;
