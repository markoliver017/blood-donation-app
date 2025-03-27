import { getAllMenus } from '@/api/menu/menusQuery';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useMenuStore = create(
    devtools((set) => ({
        menus: [],
        setMenus: (menus) => set({ menus }),
        fetchMenus: async (callback) => {
            try {
                if (callback) callback(true);
                const response = await getAllMenus();
                console.log('Refetch menus', response);
                set({ menus: response });
            } catch (error) {
                console.error('Error fetching menus:', error);
                set({ menus: [] });
            } finally {
                if (callback) callback(false);
            }
        },
    })),
);

export default useMenuStore;
