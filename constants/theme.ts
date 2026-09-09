import { ThemeName } from '@/types';

// Raw hex mirrors of the CSS variables in global.css, for the rare spots
// (SVG icon `color` props, navigator `contentStyle`) that can't consume
// Tailwind/Uniwind classes. Keep these in sync with global.css by hand.
export const THEME_COLORS: Record<
  ThemeName,
  {
    background: string;
    foreground: string;
    mutedForeground: string;
    destructive: string;
    success: string;
    warning: string;
    track: string;
  }
> = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    mutedForeground: '#737373',
    destructive: '#e7000b',
    success: '#16a34a',
    warning: '#d97706',
    track: '#f5f5f5',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    mutedForeground: '#a1a1a1',
    destructive: '#ff6467',
    success: '#4ade80',
    warning: '#fbbf24',
    track: '#262626',
  },
  red: {
    background: '#1a0505',
    foreground: '#f5e8df',
    mutedForeground: '#b08a8a',
    destructive: '#ff6b6b',
    success: '#4ade80',
    warning: '#fbbf24',
    track: '#331010',
  },
};
