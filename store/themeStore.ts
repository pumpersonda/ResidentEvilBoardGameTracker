import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '@/types';

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      mode: 'dark',
      setMode: mode => set({ mode }),
    }),
    {
      name: 're-theme-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
