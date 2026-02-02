import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// ============================================
// Public API Functions
// ============================================

export const getBlogs = async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
};

export const getBlogBySlug = async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const getCategoryBySlug = async (slug, params = {}) => {
    const response = await api.get(`/categories/${slug}`, { params });
    return response.data;
};

// ============================================
// Auth API Functions
// ============================================

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const verifyToken = async () => {
    const response = await api.get('/admin/verify');
    return response.data;
};

// ============================================
// Admin API Functions
// ============================================

export const getAllBlogsAdmin = async (params = {}) => {
    const response = await api.get('/admin/blogs', { params });
    return response.data;
};

export const getBlogById = async (id) => {
    const response = await api.get(`/admin/blogs/${id}`);
    return response.data;
};

export const createBlog = async (blogData) => {
    const response = await api.post('/admin/blogs', blogData);
    return response.data;
};

export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/admin/blogs/${id}`, blogData);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await api.delete(`/admin/blogs/${id}`);
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
};

export default api;
