import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { ThemeName } from '@/types';

/** Resolves 'system' mode down to an actual 'light' | 'dark' theme name. */
export function useResolvedTheme(): ThemeName {
  const mode = useThemeStore(state => state.mode);
  const systemScheme = useColorScheme();

  if (mode === 'system') {
    return systemScheme === 'light' ? 'light' : 'dark';
  }

  return mode;
}
