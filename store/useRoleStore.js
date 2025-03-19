import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getAllRoles } from '@/api/roles/rolesQuery';

const useRoleStore = create(
    devtools((set) => ({
        roles: [],
        setRoles: (roles) => set({ roles }),
        fetchRoles: async (callback) => {
            try {
                if (callback) callback(true);
                const response = await getAllRoles();
                set({ roles: response });
            } catch (error) {
                console.error('Error fetching roles:', error);
                set({ roles: [] });
            } finally {
                if (callback) callback(false);
            }
        },
    })),
);

export default useRoleStore;
