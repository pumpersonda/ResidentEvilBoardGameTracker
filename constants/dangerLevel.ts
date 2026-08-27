import { GameVersion, ThemeName, ThreatColor } from '@/types';
import { THEME_COLORS } from '@/constants/theme';

interface DangerLevelBand {
  color: ThreatColor;
  max: number; // inclusive upper bound of this band
}

interface DangerLevelConfig {
  maxLevel: number;
  bands: DangerLevelBand[]; // ascending by `max`, covers 0..maxLevel
}

// RE2 has no danger level dial and is intentionally absent here.
export const DANGER_LEVEL_CONFIG: Partial<Record<GameVersion, DangerLevelConfig>> = {
  [GameVersion.RE1]: {
    maxLevel: 26,
    bands: [
      { color: 'Green', max: 8 },
      { color: 'Amber', max: 17 },
      { color: 'Red', max: 26 },
    ],
  },
  [GameVersion.RE3]: {
    maxLevel: 16,
    bands: [
      { color: 'Green', max: 5 },
      { color: 'Amber', max: 11 },
      { color: 'Red', max: 16 },
    ],
  },
};

export const getDangerLevelColor = (game: GameVersion, level: number): ThreatColor | null => {
  const config = DANGER_LEVEL_CONFIG[game];
  if (!config) return null;
  const band = config.bands.find(b => level <= b.max);
  return band?.color ?? config.bands[config.bands.length - 1].color;
};

export const DANGER_LEVEL_BADGE_CLASSES: Record<ThreatColor, string> = {
  Green: 'text-success border-success',
  Amber: 'text-warning border-warning',
  Red: 'text-destructive border-destructive',
};

// Literal color (not a Tailwind class) for react-native-svg props, which can't consume classNames.
export const getDangerRingColor = (color: ThreatColor, theme: ThemeName): string => {
  const colors = THEME_COLORS[theme];
  switch (color) {
    case 'Green':
      return colors.success;
    case 'Amber':
      return colors.warning;
    case 'Red':
      return colors.destructive;
  }
};
