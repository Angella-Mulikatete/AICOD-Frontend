const IS_SERVER = typeof window === 'undefined';
const API_URL = process.env.NEXT_PUBLIC_API_URL || (IS_SERVER ? 'https://admin.albertinecommunity.org' : '');

export type FetchOptions = RequestInit & {
    params?: Record<string, string | number>;
    token?: string;
};

class ApiError extends Error {
    status: number;
    data: any;

    constructor(message: string, status: number, data?: any) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

export async function apiClient<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { params, token, headers, ...rest } = options;

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let url = `${API_URL}${cleanEndpoint}`;

    if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            searchParams.append(key, String(value));
        });
        url += `?${searchParams.toString()}`;
    }

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...rest,
        headers: {
            ...defaultHeaders,
            ...headers,
        },
    };

    try {
        console.log(`[API Request] Fetching: ${url}`);
        const response = await fetch(url, config);

        // Handle cases where response might not be JSON
        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = { message: await response.text() };
        }

        if (!response.ok) {
            throw new ApiError(data.message || 'API Request Failed', response.status, data);
        }

        console.log(`[API Response] Data from ${url}:`, data);
        return data as T;
    } catch (error: any) {
        console.error(`[API Error] Request to ${url} failed:`, error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(error?.message || 'Network Error', 500);
    }
}
