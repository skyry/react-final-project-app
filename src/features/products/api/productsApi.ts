import apiClient from '../../../services/api/client';
import {API_CONFIG} from '../../../shared/config/constants';
import type {Product, CreateProductData, UpdateProductData} from '../../../types';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
    return response.data;
  },

  create: async (productData: CreateProductData): Promise<Product> => {
    const response = await apiClient.post<Product>(API_CONFIG.ENDPOINTS.PRODUCTS, productData);
    return response.data;
  },

  update: async (id: string, productData: UpdateProductData): Promise<Product> => {
    const response = await apiClient.put<Product>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, productData);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}?category=${category}`);
    return response.data;
  },
};