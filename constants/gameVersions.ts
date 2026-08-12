import { CardType, GameVersion } from '@/types';

// Games with full data and ready for players. Add RE2/RE3 here once their
// data/RE2, data/RE3 directories are populated with real content.
export const ENABLED_GAMES: GameVersion[] = [GameVersion.RE1];

export const isGameEnabled = (game: GameVersion): boolean => ENABLED_GAMES.includes(game);

export const GAME_LABELS: Record<GameVersion, string> = {
  [GameVersion.RE1]: 'Resident Evil 1',
  [GameVersion.RE2]: 'Resident Evil 2',
  [GameVersion.RE3]: 'Resident Evil 3',
};

// Card types restricted to a subset of games. A type absent from this map is
// available to every enabled game (subject to having data).
export const CARD_TYPE_GAMES: Partial<Record<CardType, GameVersion[]>> = {
  Mission: [GameVersion.RE1, GameVersion.RE3],
  Narrative: [GameVersion.RE1],
};

export const isCardTypeAvailable = (cardType: CardType, game: GameVersion): boolean => {
  const allowedGames = CARD_TYPE_GAMES[cardType];
  return !allowedGames || allowedGames.includes(game);
};
