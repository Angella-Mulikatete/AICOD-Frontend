import { z } from 'zod';

// --- Base API Response ---
export const ApiResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

// --- Authentication & User ---
export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    role_id: z.number().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    address: z.string().nullable().optional(),
    profile_photo: z.string().url().nullable().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const LoginResponseSchema = ApiResponseSchema.extend({
    token: z.string().optional(),
    user: UserSchema.optional(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// --- Content Sections ---
export const ContentSectionSchema = z.object({
    id: z.number(),
    section_key: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string().nullable().optional(),
    video: z.string().nullable().optional(),
    order: z.number().optional(),
    is_active: z.boolean().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type ContentSection = z.infer<typeof ContentSectionSchema>;

// --- Programs ---
export interface ProgramCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ProgramCreator {
    id: number;
    name: string;
    email: string;
    phone: string;
    profile_photo: string | null;
    gender: string;
    status: string;
    created_at: string;
}

export interface Program {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    short_description: string;
    content: string;
    featured_image: string;
    objectives: string[];
    impact_stats: any | null;
    location: string;
    start_date: string;
    end_date: string | null;
    status: string;
    order: number;
    meta_title: string;
    meta_description: string;
    meta_keywords: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_completed: boolean;
    category: ProgramCategory;
    gallery: string[];
    creator: ProgramCreator;
}

export interface PaginatedPrograms {
    data: Program[];
    pagination: {
        current_page: number;
        per_page: number;
        total: number;
        last_page: number;
        from: number;
        to: number;
    };
}

// --- Generic Paginated Response ---
export function createPaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
    return ApiResponseSchema.extend({
        data: z.array(itemSchema),
        meta: z.object({
            current_page: z.number(),
            last_page: z.number(),
            total: z.number(),
        }).optional(),
    });
}
// --- Footer Data ---
export interface FooterLink {
    label: string;
    url: string;
    order: number;
}

export interface FooterSocial {
    platform: string;
    url: string;
    icon: string;
}

export interface FooterData {
    about_text: string;
    logo: string;
    quick_links: FooterLink[];
    programs_links: FooterLink[];
    legal_links: FooterLink[];
    contact_info: {
        email: string;
        phone: string;
        address: string;
    };
    social_media: FooterSocial[];
    newsletter_enabled: boolean;
    copyright_text: string;
}
// --- News & Documents ---
export interface NewsAuthor {
    id: number;
    name: string;
}

export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content?: string;
    featured_image: string;
    author_id: number;
    published_at: string;
    created_at: string;
    updated_at?: string;
    author: NewsAuthor;
}

export interface DocumentItem {
    id: number;
    title: string;
    file_url: string;
    category: string;
    year: number;
    description?: string;
    created_at: string;
}

export interface BackendDocument {
    id: number;
    title: string;
    file_path: string;
    year: number;
    category: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface DocumentListResponse extends ApiResponse {
    data: {
        documents: BackendDocument[];
        available_years: number[];
        available_categories: string[];
    };
}

export interface DocumentSingleResponse extends ApiResponse {
    data: BackendDocument;
}

export interface DocumentCategoriesResponse extends ApiResponse {
    data: string[];
}

export interface DocumentYearsResponse extends ApiResponse {
    data: number[];
}

export interface PaginatedNews {
    items: NewsItem[];
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface Statistic {
    id: number;
    label: string;
    value: number;
    icon: string;
    suffix: string | null;
    prefix: string | null;
    color: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface StatisticsResponse extends ApiResponse {
    data: Statistic[];
}

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
    order: number;
    is_active: boolean;
    views_count: number;
    created_at: string;
    updated_at: string;
}

export interface SiteSettings {
    site_name: string;
    site_tagline: string;
    contact_email: string;
}

// --- CMS Pages ---
export interface PageSection {
    id: number;
    title: string;
    content: string;
    section_type: string;
    background_image: string | null;
    background_color: string | null;
    order: number;
}

export interface PublicPage {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    featured_image: string | null;
    meta_title: string | null;
    meta_description: string | null;
    custom_css: string | null;
    custom_js: string | null;
    sections: PageSection[];
    parent?: {
        id: number;
        title: string;
        slug: string;
    } | null;
    children?: {
        id: number;
        title: string;
        slug: string;
    }[] | null;
}

export interface PageResponse extends ApiResponse {
    data: PublicPage;
}

export interface HeroSection {
    id: number;
    page: string;
    title: string;
    subtitle: string | null;
    background_image: string | null;
    background_video: string | null;
    cta_primary_text: string | null;
    cta_primary_link: string | null;
    cta_secondary_text: string | null;
    cta_secondary_link: string | null;
    overlay_opacity: number;
    text_color: string;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Company {
    id: number;
    name: string;
    registration_no: string | null;
    tax_id: string | null;
    address: string;
    logo: string | null;
    slogan: string | null;
    brand_color: string | null;
    theme: string | null;
    contact_email: string;
    contact_phone: string;
    website: string | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    google_maps_url: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    logo_url: string;
}
