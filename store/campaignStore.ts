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
  Scenario,
  ScenarioStatus,
} from '@/types';
import { CharacterProfile } from '@/data/RE1/characters';
import { CreateCampaignForm } from '@/components/screens/CreateCampaignModal';
import { getGameScenarios } from '@/data';

interface CampaignStore {
  currentCampaignId: string | null;
  allCampaigns: Campaign[];

  // Core actions
  createCampaign: (formData: CreateCampaignForm) => void;
  setCurrentCampaignId: (campaignId: string | null) => void;
  updateCampaign: (campaignId: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (campaignId: string) => void;
  resetCampaign: () => void;

  // Fast gameplay actions
  setDangerLevel: (level: number) => void;
  updateScenarioStatus: (scenarioId: string, status: ScenarioStatus) => void;
  unlockScenario: (scenarioId: string) => void;
  updateActiveCharacterHealth: (characterId: string, health: CharacterHealth) => void;
  addActiveCharacter: (activeCharacter: ActiveCharacter) => void;
  removeActiveCharacter: (characterId: string) => void;
  moveCharacterToReserve: (characterId: string) => void;
  addReserveCharacter: (character: CharacterProfile) => void;
  addItemToActiveCharacter: (characterId: string, item: Item) => void;
  removeItemFromActiveCharacter: (characterId: string, itemId: string, quantity: number) => void;
  updateActiveCharacterInventory: (characterId: string, item: Item) => void;
  resetActiveCharacterInventory: (characterId: string) => void;
  updateActiveCharacterPlayerName: (characterId: string, realName: string) => void;
  addItemToBox: (item: Item) => void;
  removeFromItemsBox: (itemId: string, quantity: number) => void;
  updateItemAmmunition: (itemId: string, ammunition: number) => void;
  addedCard: (cardType: CardType, card: Card) => void;
  discardCard: (cardType: CardType, card: Card) => void;
  removeFromAddedCards: (cardType: CardType, cardId: string, quantity: number) => void;
  removeFromDiscardedCard: (cardType: CardType, cardId: string, quantity: number) => void;
}

export const useCampaignStore = create<CampaignStore>()(
  persist(
    set => ({
      currentCampaignId: null,
      allCampaigns: [],

      createCampaign: formData =>
        set(state => {
          // Generate a unique ID and append all starting campaign defaults
          const game = formData.gameVersion as GameVersion;
          const scenarios: Scenario[] = getGameScenarios(game).map(definition => ({
            id: definition.id,
            name: definition.name,
            expansion: definition.expansion,
            status: definition.isLocked ? 'Locked' : 'Unlocked',
          }));

          const newCampaign: Campaign = {
            id: Math.random().toString(36).substring(2, 9), // Simple local ID
            name: formData.name,
            game,
            difficulty: formData.difficulty,
            dangerLevel: 0, // Starts at zero threat
            activeCharacters: [], // Empty roster at the beginning
            reserveCharacters: [],
            itemsBox: [], // Inventory box starts empty
            scenarios,
            discardedCards: {},
            addedCards: {},
            createdAt: new Date().toISOString(),
          };

          return {
            allCampaigns: [...state.allCampaigns, newCampaign],
            currentCampaignId: newCampaign.id,
          };
        }),

      setCurrentCampaignId: campaignId => set({ currentCampaignId: campaignId }),

      updateCampaign: (campaignId, updates) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c =>
            c.id === campaignId ? { ...c, ...updates } : c
          ),
        })),

      deleteCampaign: campaignId =>
        set(state => ({
          allCampaigns: state.allCampaigns.filter(c => c.id !== campaignId),
          currentCampaignId:
            state.currentCampaignId === campaignId ? null : state.currentCampaignId,
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

      unlockScenario: scenarioId =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              scenarios: c.scenarios.map(s =>
                s.id === scenarioId && s.status === 'Locked' ? { ...s, status: 'Unlocked' } : s
              ),
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

      addReserveCharacter: character =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              reserveCharacters: [...c.reserveCharacters, character],
            };
          }),
        })),

      updateActiveCharacterPlayerName: (characterId, realName) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac =>
                ac.character.id === characterId
                  ? { ...ac, controlledBy: { ...ac.controlledBy, realName } }
                  : ac
              ),
            };
          }),
        })),

      addItemToActiveCharacter: (characterId, item) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac => {
                if (ac.character.id !== characterId) return ac;
                const existingItem = ac.inventory.find(i => i.id === item.id);
                const newInventory = existingItem
                  ? ac.inventory.map(i =>
                      i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    )
                  : [...ac.inventory, item];
                return { ...ac, inventory: newInventory };
              }),
            };
          }),
        })),

      removeItemFromActiveCharacter: (characterId, itemId, quantity) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            return {
              ...c,
              activeCharacters: c.activeCharacters.map(ac => {
                if (ac.character.id !== characterId) return ac;
                const newInventory = ac.inventory
                  .map(i => (i.id === itemId ? { ...i, quantity: i.quantity - quantity } : i))
                  .filter(i => i.quantity > 0);
                return { ...ac, inventory: newInventory };
              }),
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
            const existingItem = c.itemsBox.find(i => i.id === item.id);
            const newItemsBox = existingItem
              ? c.itemsBox.map(i =>
                  i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                )
              : [...c.itemsBox, item];
            return { ...c, itemsBox: newItemsBox };
          }),
        })),

      removeFromItemsBox: (itemId, quantity) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const newItemsBox = c.itemsBox
              .map(i => (i.id === itemId ? { ...i, quantity: i.quantity - quantity } : i))
              .filter(i => i.quantity > 0);
            return { ...c, itemsBox: newItemsBox };
          }),
        })),

      updateItemAmmunition: (itemId, ammunition) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const newItemsBox = c.itemsBox.map(i =>
              i.id === itemId ? { ...i, ammunition: Math.max(0, ammunition) } : i
            );
            return { ...c, itemsBox: newItemsBox };
          }),
        })),

      discardCard: (cardType, card) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentDiscarded = c.discardedCards[cardType] || [];
            const existingCard = currentDiscarded.find(cd => cd.id === card.id);
            const newDiscarded = existingCard
              ? currentDiscarded.map(cd =>
                  cd.id === card.id ? { ...cd, quantity: cd.quantity + card.quantity } : cd
                )
              : [...currentDiscarded, card];
            return {
              ...c,
              discardedCards: {
                ...c.discardedCards,
                [cardType]: newDiscarded,
              },
            };
          }),
        })),

      addedCard: (cardType, card) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentAdded = c.addedCards[cardType] || [];
            const existingCard = currentAdded.find(ac => ac.id === card.id);
            const newAdded = existingCard
              ? currentAdded.map(ac =>
                  ac.id === card.id ? { ...ac, quantity: ac.quantity + card.quantity } : ac
                )
              : [...currentAdded, card];
            return {
              ...c,
              addedCards: {
                ...c.addedCards,
                [cardType]: newAdded,
              },
            };
          }),
        })),

      removeFromAddedCards: (cardType, cardId, quantity) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentAdded = c.addedCards[cardType] || [];
            const newAdded = currentAdded
              .map(ac => (ac.id === cardId ? { ...ac, quantity: ac.quantity - quantity } : ac))
              .filter(ac => ac.quantity > 0);
            return {
              ...c,
              addedCards: {
                ...c.addedCards,
                [cardType]: newAdded,
              },
            };
          }),
        })),

      removeFromDiscardedCard: (cardType, cardId, quantity) =>
        set(state => ({
          allCampaigns: state.allCampaigns.map(c => {
            if (c.id !== state.currentCampaignId) return c;
            const currentDiscarded = c.discardedCards[cardType] || [];
            const newDiscarded = currentDiscarded
              .map(cd => (cd.id === cardId ? { ...cd, quantity: cd.quantity - quantity } : cd))
              .filter(cd => cd.quantity > 0);
            return {
              ...c,
              discardedCards: {
                ...c.discardedCards,
                [cardType]: newDiscarded,
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
