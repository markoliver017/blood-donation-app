import create from 'zustand';

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    removeUser: () => set({ user: null }),
}));

export default useStore;
