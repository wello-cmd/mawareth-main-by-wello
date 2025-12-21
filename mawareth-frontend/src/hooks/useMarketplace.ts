import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useMarketplaceListings = () => {
    return useQuery({
        queryKey: ['marketplaceListings'],
        queryFn: async () => {
            const data = await api.marketplace.getAll();
            return data;
        },
    });
};
