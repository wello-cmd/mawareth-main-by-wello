import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useMarketplaceListings = () => {
    return useQuery({
        queryKey: ['marketplaceListings'],
        queryFn: async () => {
            const data = await api.marketplace.getAll();
            // Merge with local storage logic if needed, but ideally backend handles it.
            // Keeping it simple for migration matching existing logic:
            const userListings = JSON.parse(localStorage.getItem('merath_marketplace_listings') || '[]');
            return [...data, ...userListings];
        },
    });
};
