import create from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserStore = create(
    devtools((set) => ({
        users: [],
        userOptions: [],
        roleOptions: [],
        processing: false,
        userOnViewData: null,
        viewModalVisible: false,
        createModalVisible: false,
        setUsers: (users) => set({ users }),
        setRoleOptions: (roleOptions) => set({ roleOptions }),
        setProcessing: (processing) => set({ processing }),
        setUserOnViewData: (userOnViewData) => set({ userOnViewData }),
        setViewModalVisible: (viewModalVisible) => set({ viewModalVisible }),
        setCreateModalVisible: (createModalVisible) =>
            set({ createModalVisible }),
    })),
);
export default useUserStore;
