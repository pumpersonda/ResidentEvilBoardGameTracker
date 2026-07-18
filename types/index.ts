import { ImageSourcePropType } from 'react-native';

// Single source of truth for registered UniWind themes.
// Adding a theme: append it here, add its CSS vars in global.css,
// and add it to `extraThemes` in metro.config.js.
export const THEME_NAMES = ['light', 'dark', 'red'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];
export type ThemeMode = ThemeName | 'system';

export enum GameVersion {
  RE1 = 'RE1',
  RE2 = 'RE2',
  RE3 = 'RE3',
}

export interface Character {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
}

export interface Player {
  id: string;
  realName: string;
}

export type HealthValue = 0 | 1 | 2 | 3 | 4 | 5;

export const HEALTH_LABELS: Record<HealthValue, string> = {
  5: 'Fine',
  4: 'Fine',
  3: 'Caution',
  2: 'Caution',
  1: 'Danger',
  0: 'Dead',
};

export const HEALTH_COLORS: Record<HealthValue, string> = {
  5: '#22c55e',
  4: '#4ade80',
  3: '#eab308',
  2: '#f59e0b',
  1: '#ef4444',
  0: '#111827',
};

export interface CharacterHealth {
  value: HealthValue; // 5 = Fine (max), 0 = Dead
  isPoisoned: boolean;
}

// ==================== ENUMS ====================
export enum ItemType {
  Weapon = 'weapon',
  Ammunition = 'ammunition',
  Key = 'key',
  Item = 'item',
  Tool = 'tool',
  Defensive = 'defensive',
  Other = 'other',
}

export type ItemCategory = 'S' | 'A' | 'B' | 'C';

// ==================== INTERFACE ====================
export interface Item extends Card {
  itemType: ItemType;
  category: ItemCategory;
  ammunition?: number;
}

export interface ActiveCharacter {
  character: Character;
  controlledBy: Player;
  health: CharacterHealth;
  inventory: Item[];
  kerosene?: number; // RE1
}

export type CardType = 'Item' | 'Encounter' | 'Narrative' | 'Mission' | 'Tension' | 'Map' | 'Boss';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  specialId?: number;
  game: GameVersion;
  quantity: number | 1;
}

export type ScenarioStatus = 'Locked' | 'Unlocked' | 'Completed';

export interface Scenario {
  id: string;
  name: string;
  status: ScenarioStatus;
}

export interface Campaign {
  id: string;
  name: string;
  game: GameVersion;
  difficulty: 'Easy' | 'Normal' | 'Hard';
  dangerLevel: number;
  activeCharacters: ActiveCharacter[];
  reserveCharacters: Character[];
  itemsBox: Item[];
  addedCards: Partial<Record<CardType, Card[]>>;
  discardedCards: Partial<Record<CardType, Card[]>>;
  scenarios: Scenario[];
  createdAt: string;
}
