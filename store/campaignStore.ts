import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActiveCharacter,
  Campaign,
  Card,
  CardType,
  CharacterHealth,
  GameVersion,
  Item,
  ScenarioStatus,
} from '@/types';
import { CreateCampaignForm } from '@/components/screens/CreateCampaignModal';

interface CampaignStore {
  currentCampaignId: string | null;
  allCampaigns: Campaign[];

  // Core actions
  createCampaign: (formData: CreateCampaignForm) => void;
  setCurrentCampaignId: (campaignId: string | null) => void;
  updateCampaign: (updates: Partial<Campaign>) => void;
  resetCampaign: () => void;

  // Fast gameplay actions
  setDangerLevel: (level: number) => void;
  updateScenarioStatus: (scenarioId: string, status: ScenarioStatus) => void;
  updateActiveCharacterHealth: (characterId: string, health: CharacterHealth) => void;
  addActiveCharacter: (activeCharacter: ActiveCharacter) => void;
  removeActiveCharacter: (characterId: string) => void;
  moveCharacterToReserve: (characterId: string) => void;
  addItemToActiveCharacter: (characterId: string, item: Item) => void;
  removeItemFromActiveCharacter: (characterId: string, itemId: string) => void;
  updateActiveCharacterInventory: (characterId: string, item: Item) => void;
  resetActiveCharacterInventory: (characterId: string) => void;
  addItemToBox: (item: Item) => void;
  addedCard: (cardType: CardType, card: Card) => void;
  discardCard: (cardType: CardType, card: Card) => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    set => ({
      currentCampaignId: null,
      allCampaigns: [],

      createCampaign: formData =>
        set(state => {
          // Generate a unique ID and append all starting campaign defaults
          const newCampaign: Campaign = {
            id: Math.random().toString(36).substring(2, 9), // Simple local ID
            name: formData.name,
            game: formData.gameVersion as GameVersion,
            difficulty: formData.difficulty,
            dangerLevel: 0, // Starts at zero threat
            activeCharacters: [], // Empty roster at the beginning
            reserveCharacters: [],
            itemsBox: [], // Inventory box starts empty
            scenarios: [], // TODO: Load initial scenarios based on the game version
            discardedCards: {},
            addedCards: {},
            handCards: [],
            createdAt: new Date().toISOString(),
          };

          return {
            allCampaigns: [...state.allCampaigns, newCampaign],
            currentCampaignId: newCampaign.id,
          };
        }),

      setCurrentCampaignId: campaignId => set({ currentCampaignId: campaignId }),

      updateCampaign: updates =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c =>
            c.id === state.currentCampaignId ? { ...c, ...updates } : c
          ),
        })),

      resetCampaign: () => set({ currentCampaignId: null }),

      setDangerLevel: level =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c =>
            c.id === state.currentCampaignId ? { ...c, dangerLevel: level } : c
          ),
        })),

      updateScenarioStatus: (scenarioId, status) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              scenarios: c.scenarios.map(s => (s.id === scenarioId ? { ...s, status } : s)),
            };
          }),
        })),

      updateActiveCharacterHealth: (characterId, newHealth) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, health: newHealth } : ac
              ),
            };
          }),
        })),

      addActiveCharacter: activeCharacter =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: [...c.activeCharacters, activeCharacter],
            };
          }),
        })),

      removeActiveCharacter: characterId =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.filter(ac => ac.character.id !== characterId),
            };
          }),
        })),

      moveCharacterToReserve: characterId =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const characterToMove = c.activeCharacters.find(ac => ac.character.id === characterId);
            if (!characterToMove) return c;

            return {
              ...c,
              activeCharacters: c.activeCharacters.filter(ac => ac.character.id !== characterId),
              reserveCharacters: [...c.reserveCharacters, characterToMove.character],
            };
          }),
        })),

      addItemToActiveCharacter: (characterId, item) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, inventory: [...ac.inventory, item] } : ac
              ),
            };
          }),
        })),

      removeItemFromActiveCharacter: (characterId, itemId) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac =>
                ac.character.id === characterId
                  ? { ...ac, inventory: ac.inventory.filter(i => i.id !== itemId) }
                  : ac
              ),
            };
          }),
        })),

      updateActiveCharacterInventory: (characterId, item) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac => {
                if (ac.character.id !== characterId) return ac;
                const itemExists = ac.inventory.some(i => i.id === item.id);
                const newInventory = itemExists
                  ? ac.inventory.map(i => (i.id === item.id ? item : i))
                  : [...ac.inventory, item];
                return { ...ac, inventory: newInventory };
              }),
            };
          }),
        })),

      resetActiveCharacterInventory: characterId =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac =>
                ac.character.id === characterId ? { ...ac, inventory: [] } : ac
              ),
            };
          }),
        })),

      addItemToBox: item =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return { ...c, itemsBox: [...c.itemsBox, item] };
          }),
        })),

      discardCard: (cardType, card) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentDiscarded = c.discardedCards[cardType] || [];
            return {
              ...c,
              discardedCards: {
                ...c.discardedCards,
                [cardType]: [...currentDiscarded, card],
              },
            };
          }),
        })),

      addedCard: (cardType, card) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentAdded = c.addedCards[cardType] || [];
            return {
              ...c,
              addedCards: {
                ...c.addedCards,
                [cardType]: [...currentAdded, card],
              },
            };
          }),
        })),
    }),
    {
      name: 're-campaign-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Custom helper hook for easy consumption inside components
export const useCurrentCampaign = (): Campaign | null => {
  const allCampaigns = useCampaignStore(state => state.allCampaigns);
  const currentCampaignId = useCampaignStore(state => state.currentCampaignId);
  return allCampaigns.find(c => c.id === currentCampaignId) || null;
};
