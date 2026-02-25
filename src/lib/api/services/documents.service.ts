import { apiClient } from '../api-client';
import {
    DocumentListResponse,
    DocumentSingleResponse,
    DocumentCategoriesResponse,
    DocumentYearsResponse
} from '../models';

export const documentsService = {
    /**
     * Fetch all documents with optional filtering
     */
    async getDocuments(params?: {
        year?: number;
        category?: string;
        search?: string;
        page?: number;
    }): Promise<DocumentListResponse> {
        return apiClient<DocumentListResponse>('/api/v1/documents', { params });
    },

    /**
     * Fetch a single document by ID
     */
    async getDocumentById(id: number): Promise<DocumentSingleResponse> {
        return apiClient<DocumentSingleResponse>(`/api/v1/documents/${id}`);
    },

    /**
     * Fetch available document categories
     */
    async getDocumentCategories(): Promise<DocumentCategoriesResponse> {
        return apiClient<DocumentCategoriesResponse>('/api/v1/documents/categories');
    },

    /**
     * Fetch available document years
     */
    async getDocumentYears(): Promise<DocumentYearsResponse> {
        return apiClient<DocumentYearsResponse>('/api/v1/documents/years');
    }
};
