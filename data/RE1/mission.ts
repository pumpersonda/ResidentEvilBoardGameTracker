import { Card, GameVersion } from '@/types';

// ==================== INTERFACE ====================
export interface MissionCard extends Card {
  quote: string;
}

// ==================== DATA ====================
export const MISSION_CARDS: MissionCard[] = [
  // --- ROW 1 ---
  {
    id: 'mission-01',
    name: 'Cure For Poison',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: 'Someone out there must have survived, and they need your help.',
  },
  {
    id: 'mission-02',
    name: 'Disinfect The Room',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "A harsh chemical smell burns the back of your throat. If you don't clear this out, it will be dangerous...",
  },
  {
    id: 'mission-03',
    name: 'Disinfect The Room',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "A harsh chemical smell burns the back of your throat. If you don't clear this out, it will be dangerous...",
  },
  {
    id: 'mission-04',
    name: 'Resting Place',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: 'So this is what happened to the staff... someone has brought them down here to rest.',
  },

  // --- ROW 2 ---
  {
    id: 'mission-05',
    name: 'Dangerous Puzzle',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'A complex mechanism bars the way, guarding a valuable asset... but making a mistake will have deadly consequences.',
  },
  {
    id: 'mission-06',
    name: 'Dangerous Puzzle',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'A complex mechanism bars the way, guarding a valuable asset... but making a mistake will have deadly consequences.',
  },
  {
    id: 'mission-07',
    name: 'Trapped',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "Help me! I'm trapped!",
  },
  {
    id: 'mission-08',
    name: 'Weapon Cache',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "You've stumbled across a stash of weaponry left by a doomed guard... or perhaps one of the other S.T.A.R.S. members.",
  },

  // --- ROW 3 ---
  {
    id: 'mission-09',
    name: 'Clear The Corridor',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'A veritable horde of fiends stand in your way. You have no choice but to clear them out.',
  },
  {
    id: 'mission-10',
    name: 'Disarm Trap',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'You freeze as a barely perceptible sound catches your attention, and look down. A wire stretches taut across the corridor.',
  },
  {
    id: 'mission-11',
    name: 'Disarm Trap',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'You freeze as a barely perceptible sound catches your attention, and look down. A wire stretches taut across the corridor.',
  },
  {
    id: 'mission-12',
    name: 'Secure The Area',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "It's vital to have a route back to the main hall, but unfortunately, several corpses lay strewn on the ground ahead of you.",
  },

  // --- ROW 4 ---
  {
    id: 'mission-13',
    name: 'Supply Run',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'It would be an unnecessary risk heading down there... but you could really use the supplies.',
  },
  {
    id: 'mission-14',
    name: 'Supply Run',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'It would be an unnecessary risk heading down there... but you could really use the supplies.',
  },
  {
    id: 'mission-15',
    name: 'Supply Run',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'It would be an unnecessary risk heading down there... but you could really use the supplies.',
  },
  {
    id: 'mission-16',
    name: "Researcher's Will",
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: 'Someone has painstakingly hidden their last testament from prying eyes.',
  },

  // --- ROW 5 ---
  {
    id: 'mission-17',
    name: 'Scouting Run',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "It's quiet. Too quiet. Best to scout out the area ahead before advancing.",
  },
  {
    id: 'mission-18',
    name: 'Scouting Run',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "It's quiet. Too quiet. Best to scout out the area ahead before advancing.",
  },
  {
    id: 'mission-19',
    name: 'Clear The Corridor',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      'A veritable horde of fiends stand in your way. You have no choice but to clear them out.',
  },
  {
    id: 'mission-20',
    name: 'Barricade The Windows',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "You're constantly checking over your shoulder, on edge from the sound of shattering glass.",
  },

  // --- ROW 6 ---
  {
    id: 'mission-21',
    name: 'Barricade The Windows',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "You're constantly checking over your shoulder, on edge from the sound of shattering glass.",
  },
  {
    id: 'mission-22',
    name: 'Barricade The Windows',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "You're constantly checking over your shoulder, on edge from the sound of shattering glass.",
  },
  {
    id: 'mission-23',
    name: 'Defend The Area',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "The enemies here must be destroyed. But whatever you do, don't let them overrun your position!",
  },
  {
    id: 'mission-24',
    name: 'Dependable To The End',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: '', // Esta es la carta de Richard Aiken, no tiene texto en cursiva/quote en la imagen.
  },

  // --- ROW 7 ---
  {
    id: 'mission-25',
    name: 'Medical Delivery',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "We're going to need more of these...",
  },
  {
    id: 'mission-26',
    name: 'Medical Delivery',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "We're going to need more of these...",
  },
  {
    id: 'mission-27',
    name: 'In Need Of Assistance',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "They're badly hurt... and you're not sure how much longer they'll be able to last without help.",
  },
  {
    id: 'mission-28',
    name: 'Rescue Mission',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "This place is dangerous. It's time to gather the other survivors, and make sure everyone is safe.",
  },

  // --- ROW 8 ---
  {
    id: 'mission-29',
    name: 'Search For Survivors',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "With no radio contact, the only way you'll know if the others are okay is to look for them.",
  },
  {
    id: 'mission-30',
    name: 'Burn The Bodies',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: "They're dead now, but how long before they get up again?",
  },
  {
    id: 'mission-31',
    name: 'Secure The Area',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote:
      "It's vital to have a route back to the main hall, but unfortunately, several corpses lay strewn on the ground ahead of you.",
  },
  {
    id: 'mission-32',
    name: 'Resting Place',
    type: 'Mission',
    game: GameVersion.RE1,
    quantity: 1,
    quote: 'So this is what happened to the staff... someone has brought them down here to rest.',
  },
];
