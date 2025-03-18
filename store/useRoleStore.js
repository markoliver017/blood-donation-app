import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAllRoles } from '@/api/roles/rolesQuery';

const useRoleStore = create(
    devtools((set) => ({
        roles: [],
        setRoles: (roles) => set({ roles }),
        fetchRoles: async () => {
            try {
                const response = await getAllRoles();
                set({ roles: response });
            } catch (error) {
                console.error('Error fetching roles:', error);
                set({ roles: [] });
            }
        },
    })),
);

export default useRoleStore;
