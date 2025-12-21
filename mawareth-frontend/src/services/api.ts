// Backend Integration Layer
import { User, Estate, MarketplaceListing, AuthUser } from '@/types/models';

// NOTE: Hardcoded to local backend. In production this should be an env var.
const API_URL = 'http://localhost:5000/api';

const fetchJson = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  } as HeadersInit;

  if (token) {
    (headers as any)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || 'API Request Failed');
  }
  const json = await res.json();
  return json.data || json;
};

export const api = {
  // Users
  users: {
    getAll: async (): Promise<AuthUser[]> => fetchJson('/users'),
    getById: async (id: string): Promise<User | undefined> => fetchJson(`/users/${id}`),

    // Login 
    login: async (email: string, password: string): Promise<{ user: User, token: string }> => {
      const response = await fetchJson('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      // Storage handled by caller (AuthContext or Component)
      return { user: response.user, token: response.session.token };
    },

    // Register
    register: async (userData: any): Promise<{ user: User, token: string }> => {
      const response = await fetchJson('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return { user: response.user, token: response.session?.token };
    },

    // Legacy/Mock compat (Deprecated)
    authenticate: async (phone: string): Promise<User | undefined> => {
      console.warn('api.users.authenticate(phone) is deprecated. Use login(email, password).');
      return undefined;
    },

    updateRole: async (userId: string, role: string): Promise<User> => {
      return fetchJson(`/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ role })
      });
    },

    approve: async (userId: string): Promise<User> => {
      return fetchJson(`/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ isVerified: true })
      });
    },

    delete: async (userId: string): Promise<boolean> => {
      await fetchJson(`/users/${userId}`, {
        method: 'DELETE'
      });
      return true;
    }
  },

  // Estates
  estates: {
    getAll: async (): Promise<Estate[]> => fetchJson('/estates'),
    getById: async (id: string): Promise<Estate | undefined> => fetchJson(`/estates/${id}`),
    getByStatus: async (status: Estate['status']): Promise<Estate[]> => fetchJson(`/estates?status=${status}`),

    updateVote: async (estateId: string, data: { nationalId: string, vote: 'agree' | 'disagree' }): Promise<boolean> => {
      // Use the PUBLIC guest route
      try {
        await fetchJson(`/estates/public/vote/${estateId}`, {
          method: 'PATCH',
          body: JSON.stringify(data)
        });
        return true;
      } catch (e) {
        console.error(e);
        throw e; // Re-throw to show toast in UI
      }
    },
    updateConsensus: async (estateId: string, vote: 'accept' | 'reject'): Promise<boolean> => {
      // Deprecated/Admin only
      return false;
    },
  },

  // Marketplace
  marketplace: {
    getAll: async (): Promise<MarketplaceListing[]> => {
      const data = await fetchJson('/marketplace');
      // Backend populates estateId, invalidating strict types temporarily for mapping
      return data.map((l: any) => {
        const estate = l.estateId || {};
        const profitPercentage = l.marketValuation
          ? Math.round(((l.marketValuation - (l.startingBid || 0)) / l.marketValuation) * 100)
          : 0;

        return {
          ...l,
          askPrice: l.startingBid,
          depositRequired: 50000,
          title: estate.title || l.title || 'Untitled',
          address: estate.address,
          city: estate.city,
          country: estate.country,
          area: estate.area,
          propertyType: estate.propertyType,
          images: estate.images || [],
          // Keep estateId as ID string if possible, or object if interface allows. 
          // Interface MarketplaceListing says estateId: string. 
          // But flattening is better. 
          estateId: estate._id || l.estateId,
          profitPercentage
        };
      });
    },
    getById: async (id: string): Promise<MarketplaceListing | undefined> => fetchJson(`/marketplace/${id}`),

    updateStatus: async (listingId: string, status: 'active' | 'rejected'): Promise<boolean> => {
      await fetchJson(`/marketplace/${listingId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      return true;
    },

    unlockListing: async (listingId: string, depositAmount: number): Promise<boolean> => {
      // Stub
      return true;
    },
  },
};

// Format currency helper
export const formatEGP = (amount: number): string => {
  return new Intl.NumberFormat('en-EG', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' EGP';
};

// Calculate consensus percentage
export const calculateConsensus = (estate: Estate, voteType: 'sell' | 'keep'): number => {
  const totalHeirs = estate.heirs.length;
  const votesForType = estate.heirs.filter(h => h.vote === voteType).length;
  return Math.round((votesForType / totalHeirs) * 100);
};

