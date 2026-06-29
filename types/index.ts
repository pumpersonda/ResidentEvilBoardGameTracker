import {ImageSourcePropType} from 'react-native';

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

export type HealthState = 'Fine' | 'Caution' | 'Danger' | 'Dead';

export interface HealthTrack {
    current: HealthState;
}

export type ItemCategory = 'Weapon' | 'Herb' | 'Ammo' | 'Key' | 'Tool' | 'Other';

export interface Item {
    id: string;
    name: string;
    category: ItemCategory;
    quantity: number;
}

export interface ActiveCharacter {
    character: Character;
    controlledBy: Player;
    health: HealthTrack;
    inventory: Item[];
    kerosene?: number; // RE1
}

export type CardType =
    | 'Item'
    | 'Encounter'
    | 'Narrative'
    | 'Mission'
    | 'Tension'
    | 'Map'
    | 'Boss';

export interface Card {
    id: string;
    name: string;
    type: CardType;
    serialNumber?: string;
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
    handCards: Card[];
    discardedCards: Partial<Record<CardType, Card[]>>;
    scenarios: Scenario[];
    createdAt: string;
}