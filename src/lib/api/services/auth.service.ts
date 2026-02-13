import { apiClient } from '../api-client';
import { LoginResponse, UserSchema, ApiResponse } from '../models';
import { z } from 'zod';

export const authService = {
    async login(credentials: any): Promise<LoginResponse> {
        return apiClient<LoginResponse>('/api/v1/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    async logout(token: string): Promise<ApiResponse> {
        return apiClient<ApiResponse>('/api/v1/auth/logout', {
            method: 'POST',
            token,
        });
    },

    async getProfile(token: string) {
        return apiClient<any>('/api/v1/auth/profile', {
            method: 'GET',
            token,
        });
    },

    async registerStaff(data: any): Promise<ApiResponse> {
        return apiClient<ApiResponse>('/api/v1/auth/register-staff', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
};
