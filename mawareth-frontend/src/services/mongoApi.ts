// MongoDB API Service Layer
// This file contains all the API calls that will connect to your MongoDB backend
// Replace API_BASE_URL with your actual MongoDB backend URL when deploying

import axios from 'axios';
import {
  AuthUser,
  AuthSession,
  Estate,
  MarketplaceListing,
  BuyoutApplication,
  User
} from '@/types/models';

// Configuration - Replace with your actual MongoDB API URL
const API_BASE_URL = import.meta.env.VITE_MONGODB_API_URL || 'http://localhost:5000/api';

// Create axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const session = localStorage.getItem('merath_session');
  if (session) {
    try {
      const { token } = JSON.parse(session);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Error parsing session:', e);
    }
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear session on unauthorized
      localStorage.removeItem('merath_session');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Type definitions for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface LoginResponse {
  user: AuthUser;
  session: AuthSession;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: 'heir' | 'investor' | 'admin';
}

// ==================== AUTH API ====================
export const authApi = {
  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed',
      };
    }
  },

  /**
   * Register a new user
   */
  signup: async (data: SignupData): Promise<ApiResponse<LoginResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/signup', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Signup failed',
      };
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<ApiResponse<null>> => {
    try {
      await apiClient.post('/auth/logout');
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Logout failed',
      };
    }
  },

  /**
   * Get current user session
   */
  getSession: async (): Promise<ApiResponse<AuthUser>> => {
    try {
      const response = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Session check failed',
      };
    }
  },

  /**
   * Refresh the auth token
   */
  refreshToken: async (): Promise<ApiResponse<AuthSession>> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthSession>>('/auth/refresh');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Token refresh failed',
      };
    }
  },
};

// ==================== USERS API ====================
export const usersApi = {
  /**
   * Get all users (admin only)
   */
  getAll: async (): Promise<ApiResponse<User[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<User[]>>('/users');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch users',
      };
    }
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch user',
      };
    }
  },

  /**
   * Update user profile
   */
  update: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update user',
      };
    }
  },
};

// ==================== ESTATES API ====================
export const estatesApi = {
  /**
   * Get all estates
   */
  getAll: async (): Promise<ApiResponse<Estate[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Estate[]>>('/estates');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch estates',
      };
    }
  },

  /**
   * Get estate by ID
   */
  getById: async (id: string): Promise<ApiResponse<Estate>> => {
    try {
      const response = await apiClient.get<ApiResponse<Estate>>(`/estates/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch estate',
      };
    }
  },

  /**
   * Get estates by status
   */
  getByStatus: async (status: Estate['status']): Promise<ApiResponse<Estate[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Estate[]>>(`/estates/status/${status}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch estates',
      };
    }
  },

  /**
   * Create a new estate
   */
  create: async (data: Omit<Estate, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Estate>> => {
    try {
      const response = await apiClient.post<ApiResponse<Estate>>('/estates', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create estate',
      };
    }
  },

  /**
   * Update heir vote
   */
  updateVote: async (estateId: string, heirId: string, vote: 'sell' | 'keep'): Promise<ApiResponse<Estate>> => {
    try {
      const response = await apiClient.patch<ApiResponse<Estate>>(`/estates/${estateId}/vote`, {
        heirId,
        vote,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update vote',
      };
    }
  },

  /**
   * Update consensus
   */
  updateConsensus: async (estateId: string, vote: 'accept' | 'reject'): Promise<ApiResponse<Estate>> => {
    try {
      const response = await apiClient.patch<ApiResponse<Estate>>(`/estates/${estateId}/consensus`, { vote });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update consensus',
      };
    }
  },
};

// ==================== MARKETPLACE API ====================
export const marketplaceApi = {
  /**
   * Get all marketplace listings
   */
  getAll: async (): Promise<ApiResponse<MarketplaceListing[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<MarketplaceListing[]>>('/marketplace');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch listings',
      };
    }
  },

  /**
   * Get listing by ID
   */
  getById: async (id: string): Promise<ApiResponse<MarketplaceListing>> => {
    try {
      const response = await apiClient.get<ApiResponse<MarketplaceListing>>(`/marketplace/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch listing',
      };
    }
  },

  /**
   * Unlock a listing with deposit
   */
  unlockListing: async (listingId: string, depositAmount: number): Promise<ApiResponse<MarketplaceListing>> => {
    try {
      const response = await apiClient.post<ApiResponse<MarketplaceListing>>(`/marketplace/${listingId}/unlock`, {
        depositAmount,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to unlock listing',
      };
    }
  },

  /**
   * Place a bid on auction
   */
  placeBid: async (listingId: string, amount: number): Promise<ApiResponse<MarketplaceListing>> => {
    try {
      const response = await apiClient.post<ApiResponse<MarketplaceListing>>(`/marketplace/${listingId}/bid`, {
        amount,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to place bid',
      };
    }
  },
};

// ==================== BUYOUT APPLICATIONS API ====================
export const buyoutApi = {
  /**
   * Create a new buyout application
   */
  create: async (data: Omit<BuyoutApplication, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<BuyoutApplication>> => {
    try {
      const response = await apiClient.post<ApiResponse<BuyoutApplication>>('/buyouts', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create application',
      };
    }
  },

  /**
   * Get all applications for current user
   */
  getMyApplications: async (): Promise<ApiResponse<BuyoutApplication[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<BuyoutApplication[]>>('/buyouts/my');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch applications',
      };
    }
  },

  /**
   * Get application by ID
   */
  getById: async (id: string): Promise<ApiResponse<BuyoutApplication>> => {
    try {
      const response = await apiClient.get<ApiResponse<BuyoutApplication>>(`/buyouts/${id}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch application',
      };
    }
  },

  /**
   * Update application status
   */
  updateStatus: async (id: string, status: BuyoutApplication['status']): Promise<ApiResponse<BuyoutApplication>> => {
    try {
      const response = await apiClient.patch<ApiResponse<BuyoutApplication>>(`/buyouts/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update status',
      };
    }
  },
};

// ==================== CHAT API ====================
export const chatApi = {
  /**
   * Get all chats for user
   */
  getUserChats: async (): Promise<ApiResponse<any[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<any[]>>('/chat');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch chats',
      };
    }
  },

  /**
   * Create or get active chat
   */
  createOrGetChat: async (): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.post<ApiResponse<any>>('/chat');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to create chat',
      };
    }
  },

  /**
   * Send message
   */
  sendMessage: async (chatId: string, text: string): Promise<ApiResponse<any>> => {
    try {
      const response = await apiClient.post<ApiResponse<any>>(`/chat/${chatId}/message`, { text });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to send message',
      };
    }
  },
};

// ==================== EXPORT ALL ====================
export const mongoApi = {
  auth: authApi,
  users: usersApi,
  estates: estatesApi,
  marketplace: marketplaceApi,
  buyouts: buyoutApi,
  chat: chatApi,
};

export default mongoApi;
