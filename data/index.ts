import { Card, CardType, GameVersion } from '@/types';
import { RE1_CARDS } from './RE1';
import { CHARACTERS_PROFILE, CharacterProfile } from './RE1/characters';

const CARDS_BY_GAME: Record<GameVersion, Partial<Record<CardType, Card[]>>> = {
  [GameVersion.RE1]: RE1_CARDS,
  [GameVersion.RE2]: {},
  [GameVersion.RE3]: {},
};

const CHARACTERS_BY_GAME: Record<GameVersion, CharacterProfile[]> = {
  [GameVersion.RE1]: CHARACTERS_PROFILE,
  [GameVersion.RE2]: [],
  [GameVersion.RE3]: [],
};

/** All playable character profiles for a game. */
export const getGameCharacters = (game: GameVersion): CharacterProfile[] =>
  CHARACTERS_BY_GAME[game];

/** Looks up the full card definition (quote, description, color, etc.) for a discarded/added card entry. */
export const getGameCardData = (
  game: GameVersion,
  cardType: CardType,
  cardId: string
): Card | undefined => CARDS_BY_GAME[game]?.[cardType]?.find(card => card.id === cardId);

/** All known card definitions for a game, grouped by category. */
export const getGameCards = (game: GameVersion): Partial<Record<CardType, Card[]>> =>
  CARDS_BY_GAME[game];
