import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
    persist(
        (set, get) => ({
            isDark: false,
            toggleTheme: () => set({ isDark: !get().isDark }),
        }),
        { name: 'starquest-theme', version: 2 }
    )
);

export default useThemeStore;
