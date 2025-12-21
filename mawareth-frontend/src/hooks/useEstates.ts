import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

export const useEstates = () => {
    return useQuery({
        queryKey: ['estates'],
        queryFn: async () => {
            const data = await api.estates.getAll();
            return data;
        },
    });
};
