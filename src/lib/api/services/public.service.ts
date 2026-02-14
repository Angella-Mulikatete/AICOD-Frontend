import { apiClient } from '../api-client';
import { ContentSection, Program, ApiResponse } from '../models';

export const contentService = {
    async getHomepageData(): Promise<any> {
        return apiClient<any>('/api/v1/homepage');
    },

    async getContentSections(): Promise<{ success: boolean; data: ContentSection[] }> {
        return apiClient<{ success: boolean; data: ContentSection[] }>('/api/v1/content-sections');
    },

    async getContentSectionByKey(key: string): Promise<{ success: boolean; data: ContentSection }> {
        return apiClient<{ success: boolean; data: ContentSection }>(`/api/v1/content-sections/${key}`);
    },

    async getHeroByPage(page: string): Promise<any> {
        return apiClient<any>(`/api/v1/heroes/${page}`);
    },

    async getMenuByLocation(location: string): Promise<any> {
        return apiClient<any>(`/api/v1/menu/${location}`);
    }
};

export const publicService = {
    async getNews(params?: { search?: string; page?: number }): Promise<any> {
        return apiClient<any>('/api/v1/news', { params });
    },

    async getNewsBySlug(slug: string): Promise<any> {
        return apiClient<any>(`/api/v1/news/${slug}`);
    },

    async getRecentNews(count: number = 5): Promise<any> {
        return apiClient<any>(`/api/v1/news/recent/${count}`);
    },

    async getDocuments(params?: { year?: number; category?: string }): Promise<any> {
        return apiClient<any>('/api/v1/documents', { params });
    },

    async submitContactForm(data: any): Promise<ApiResponse> {
        return apiClient<ApiResponse>('/api/v1/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async getDonationRequests(): Promise<any> {
        return apiClient<any>('/api/v1/donation-requests');
    },

    async getCompanies(): Promise<any> {
        return apiClient<any>('/api/v1/companies');
    },

    async getPrograms(params?: { per_page?: number; page?: number }): Promise<any> {
        return apiClient<any>('/api/v1/programs', { params });
    },

    async getProgramBySlug(slug: string): Promise<any> {
        return apiClient<any>(`/api/v1/programs/${slug}`);
    },

    async getFooter(): Promise<any> {
        return apiClient<any>('/api/v1/footer');
    },

    async getStatistics(): Promise<{ success: boolean; data: any[] }> {
        return apiClient<{ success: boolean; data: any[] }>('/api/v1/statistics');
    },

    async getFAQs(): Promise<{ success: boolean; data: any[] }> {
        return apiClient<{ success: boolean; data: any[] }>('/api/v1/faqs');
    }
};
