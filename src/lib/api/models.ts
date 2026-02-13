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
export const ProgramSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    category: z.string().optional(),
    status: z.string().optional(),
});

export type Program = z.infer<typeof ProgramSchema>;

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
