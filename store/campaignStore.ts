import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Campaign,
  ScenarioStatus,
  Item,
  CardType,
  Card,
  CharacterHealth,
  ActiveCharacter,
} from '@/types';

interface CampaignStore {
  currentCampaign: Campaign | null;

  // Core actions
  setCurrentCampaign: (campaign: Campaign) => void;
  updateCampaign: (updates: Partial<Campaign>) => void;
  resetCampaign: () => void;

  // Specific fast actions (UX friendly)
  /** Updates the campaign danger level. Used for quick threat adjustments during gameplay. */
  setDangerLevel: (level: number) => void;
  /** Changes a scenario's status (locked, unlocked, completed, failed). */
  updateScenarioStatus: (scenarioId: string, status: ScenarioStatus) => void;
  /** Updates an active character's health state (e.g., damage taken, healing). */
  updateActiveCharacterHealth: (characterId: string, health: CharacterHealth) => void;
  /** Adds a character to the active roster for the current campaign. */
  addActiveCharacter: (activeCharacter: ActiveCharacter) => void;
  /** Removes a character from the active roster entirely. */
  removeActiveCharacter: (characterId: string) => void;
  /** Moves a character from active roster to reserve pool (e.g., after death or removal from scenario). */
  moveCharacterToReserve: (characterId: string) => void;
  /** Adds an item to a character's inventory (fast append without replacement logic). */
  addItemToActiveCharacter: (characterId: string, item: Item) => void;
  /** Removes a specific item from a character's inventory by its ID. */
  removeItemFromActiveCharacter: (characterId: string, item: Item) => void;
  /** Updates or adds an item in a character's inventory. Replaces if exists by ID, appends otherwise. */
  updateActiveCharacterInventory: (characterId: string, item: Item) => void;
  /** Clears all items from a character's inventory (reset to empty state). */
  resetActiveCharacterInventory: (characterId: string) => void;
  /** Adds an item to the shared Item Box (common pool accessible to all characters). */
  addItemToBox: (item: Item) => void;
  /** Records a card that was added from the deck to game state for tracking. */
  addedCard: (cardType: CardType, card: Card) => void;
  /** Moves a card to the discard pile for a specific card type (tension, narrative, equipment, etc.). */
  discardCard: (cardType: CardType, card: Card) => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    (set, get) => ({
      currentCampaign: null,

      setCurrentCampaign: campaign => set({ currentCampaign: campaign }),

      updateCampaign: updates =>
        set(state => ({
          currentCampaign: state.currentCampaign ? { ...state.currentCampaign, ...updates } : null,
        })),

      resetCampaign: () => set({ currentCampaign: null }),

      setDangerLevel: level =>
        set(state => ({
          currentCampaign: state.currentCampaign
            ? { ...state.currentCampaign, dangerLevel: level }
            : null,
        })),

      updateScenarioStatus: (scenarioId: string, status: ScenarioStatus) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              scenarios: campaign.scenarios.map(s => (s.id === scenarioId ? { ...s, status } : s)),
            },
          };
        }),

      updateActiveCharacterHealth: (characterId: string, newHealth: CharacterHealth) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, health: newHealth } : ac
              ),
            },
          };
        }),
      addActiveCharacter: activeCharacter =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: [...campaign.activeCharacters, activeCharacter],
            },
          };
        }),

      removeActiveCharacter: characterId =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.filter(
                ac => ac.character.id !== characterId
              ),
            },
          };
        }),

      moveCharacterToReserve: characterId =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          const characterToMove = campaign.activeCharacters.find(
            ac => ac.character.id === characterId
          );
          if (!characterToMove) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.filter(
                ac => ac.character.id !== characterId
              ),
              reserveCharacters: [...campaign.reserveCharacters, characterToMove.character],
            },
          };
        }),

      addItemToActiveCharacter: (characterId, item) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, inventory: [...ac.inventory, item] } : ac
              ),
            },
          };
        }),

      addItemToBox: item =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              itemsBox: [...campaign.itemsBox, item],
            },
          };
        }),

      discardCard: (cardType: CardType, card: Card) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          const currentDiscarded = campaign.discardedCards[cardType] || [];

          return {
            currentCampaign: {
              ...campaign,
              discardedCards: {
                ...campaign.discardedCards,
                [cardType]: [...currentDiscarded, card],
              },
            },
          };
        }),
      addedCard: (cardType: CardType, card: Card) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          const currentDiscarded = campaign.addedCards[cardType] || [];

          return {
            currentCampaign: {
              ...campaign,
              addedCards: {
                ...campaign.addedCards,
                [cardType]: [...currentDiscarded, card],
              },
            },
          };
        }),
      removeItemFromActiveCharacter: (characterId: string, item: Item) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.map(ac =>
                ac.character.id === characterId
                  ? {
                      ...ac,
                      inventory: ac.inventory.filter(invItem => invItem.id !== item.id),
                    }
                  : ac
              ),
            },
          };
        }),
      resetActiveCharacterInventory: (characterId: string) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, inventory: [] } : ac
              ),
            },
          };
        }),
      updateActiveCharacterInventory: (characterId: string, item: Item) =>
        set(state => {
          const campaign = state.currentCampaign;
          if (!campaign) return state;

          return {
            currentCampaign: {
              ...campaign,
              activeCharacters: campaign.activeCharacters.map(ac =>
                ac.character.id === characterId
                  ? {
                      ...ac,
                      inventory: [...ac.inventory, item],
                    }
                  : ac
              ),
            },
          };
        }),
    }),
    {
      name: 're-campaign-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
