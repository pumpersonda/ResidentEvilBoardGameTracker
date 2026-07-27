import { Card, CardType } from '@/types';
import { TENSION_CARDS } from './tension';

export const RE1_CARDS: Partial<Record<CardType, Card[]>> = {
  Tension: TENSION_CARDS,
};
