import { Card, CardType } from '@/types';
import { TENSION_CARDS } from './tension';
import { ENCOUNTER_CARDS } from '@/data/RE1/encounter';
import { MISSION_CARDS } from '@/data/RE1/mission';
import { NARRATIVE_CARDS } from '@/data/RE1/narrative';

export const RE1_CARDS: Partial<Record<CardType, Card[]>> = {
  Tension: TENSION_CARDS,
  Encounter: ENCOUNTER_CARDS,
  Mission: MISSION_CARDS,
  Narrative: NARRATIVE_CARDS,
};
