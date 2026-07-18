import { ThemeName } from '@/types';

// Raw hex mirrors of the CSS variables in global.css, for the rare spots
// (SVG icon `color` props, navigator `contentStyle`) that can't consume
// Tailwind/Uniwind classes. Keep these in sync with global.css by hand.
export const THEME_COLORS: Record<
  ThemeName,
  { background: string; foreground: string; mutedForeground: string; destructive: string }
> = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    mutedForeground: '#737373',
    destructive: '#e7000b',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    mutedForeground: '#a1a1a1',
    destructive: '#ff6467',
  },
};
