import { Card as CardModel } from '@/types';
import { TensionCard, TensionColor } from '@/data/RE1/tension';

export const TENSION_ACCENT_CLASSES: Record<TensionColor, string> = {
  Green: 'border-l-success',
  Amber: 'border-l-warning',
  Red: 'border-l-destructive',
};

export const isTensionCard = (card: CardModel): card is TensionCard => card.type === 'Tension';
