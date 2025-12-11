// MockService layer - simulates REST API for easy MongoDB migration
import { User, Estate, MarketplaceListing } from '@/types/models';
import { mockUsers, mockEstates, mockMarketplaceListings } from '@/data/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Users
  users: {
    getAll: async (): Promise<User[]> => {
      await delay(300);
      return mockUsers;
    },
    getById: async (id: string): Promise<User | undefined> => {
      await delay(200);
      return mockUsers.find(u => u._id === id);
    },
    authenticate: async (phone: string): Promise<User | undefined> => {
      await delay(400);
      return mockUsers.find(u => u.phone === phone);
    },
  },

  // Estates
  estates: {
    getAll: async (): Promise<Estate[]> => {
      await delay(300);
      return mockEstates;
    },
    getById: async (id: string): Promise<Estate | undefined> => {
      await delay(200);
      return mockEstates.find(e => e._id === id);
    },
    getByStatus: async (status: Estate['status']): Promise<Estate[]> => {
      await delay(250);
      return mockEstates.filter(e => e.status === status);
    },
    updateVote: async (estateId: string, heirId: string, vote: 'sell' | 'keep'): Promise<boolean> => {
      await delay(300);
      const estate = mockEstates.find(e => e._id === estateId);
      if (estate) {
        const heir = estate.heirs.find(h => h._id === heirId);
        if (heir) {
          heir.vote = vote;
          return true;
        }
      }
      return false;
    },
    updateConsensus: async (estateId: string, vote: 'accept' | 'reject'): Promise<boolean> => {
      await delay(300);
      const estate = mockEstates.find(e => e._id === estateId);
      if (estate && estate.consensus) {
        if (vote === 'accept') {
          estate.consensus.accepted += 1;
        }
        return true;
      }
      return false;
    },
  },

  // Marketplace
  marketplace: {
    getAll: async (): Promise<MarketplaceListing[]> => {
      await delay(300);
      return mockMarketplaceListings;
    },
    getById: async (id: string): Promise<MarketplaceListing | undefined> => {
      await delay(200);
      return mockMarketplaceListings.find(l => l._id === id);
    },
    unlockListing: async (listingId: string, depositAmount: number): Promise<boolean> => {
      await delay(500);
      // In real implementation, this would process payment and unlock
      console.log(`Processing deposit of ${depositAmount} EGP for listing ${listingId}`);
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
