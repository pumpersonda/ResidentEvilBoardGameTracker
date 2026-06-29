import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Campaign, ScenarioStatus, HealthState, Item, ActiveCharacter} from '@/types';


interface CampaignStore {
    currentCampaign: Campaign | null;

    // Core actions
    setCurrentCampaign: (campaign: Campaign) => void;
    updateCampaign: (updates: Partial<Campaign>) => void;
    resetCampaign: () => void;

    // Specific fast actions (UX friendly)
    setDangerLevel: (level: number) => void;
    updateScenarioStatus: (scenarioId: string, status: ScenarioStatus) => void;
    updateActiveCharacterHealth: (characterId: string, health: HealthState) => void;
    addItemToActiveCharacter: (characterId: string, item: Item) => void;
    removeItemFromActiveCharacter: (characterId: string, item: Item) => void;
    updateActiveCharacterInventory: (characterId: string, item: Item) => void;
    resetActiveCharacterInventory: (characterId: string) => void;
    addItemToBox: (item: Item) => void;
    discardCard: (cardType: string, card: any) => void;
}

export const useCampaignStore = create<CampaignStore>()(
    persist(
        (set, get) => ({
            currentCampaign: null,

            setCurrentCampaign: (campaign) => set({currentCampaign: campaign}),

            updateCampaign: (updates) =>
                set((state) => ({
                    currentCampaign: state.currentCampaign
                        ? {...state.currentCampaign, ...updates}
                        : null,
                })),

            resetCampaign: () => set({currentCampaign: null}),

            setDangerLevel: (level) =>
                set((state) => ({
                    currentCampaign: state.currentCampaign
                        ? {...state.currentCampaign, dangerLevel: level}
                        : null,
                })),

            updateScenarioStatus: (scenarioId, status) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    return {
                        currentCampaign: {
                            ...campaign,
                            scenarios: campaign.scenarios.map((s) =>
                                s.id === scenarioId ? {...s, status} : s
                            ),
                        },
                    };
                }),

            updateActiveCharacterHealth: (characterId, health) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    return {
                        currentCampaign: {
                            ...campaign,
                            activeCharacters: campaign.activeCharacters.map((ac) =>
                                ac.character.id === characterId
                                    ? {...ac, health: {current: health}}
                                    : ac
                            ),
                        },
                    };
                }),

            addItemToActiveCharacter: (characterId, item) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    return {
                        currentCampaign: {
                            ...campaign,
                            activeCharacters: campaign.activeCharacters.map((ac) =>
                                ac.character.id === characterId
                                    ? {...ac, inventory: [...ac.inventory, item]}
                                    : ac
                            ),
                        },
                    };
                }),

            addItemToBox: (item) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    return {
                        currentCampaign: {
                            ...campaign,
                            itemsBox: [...campaign.itemsBox, item],
                        },
                    };
                }),

            discardCard: (cardType, card) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    const currentDiscarded = campaign.discardedCards[cardType as any] || [];
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
            removeItemFromActiveCharacter: (characterId: string, item: Item) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;

                    return {
                        currentCampaign
                    }
                }),
            resetActiveCharacterInventory: (characterId: string) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;
                    return {}
                }),
            updateActiveCharacterInventory: (characterId: string, item: Item) =>
                set((state) => {
                    const campaign = state.currentCampaign;
                    if (!campaign) return state;
                    return {

                    }
                })
        }),
        {
            name: 're-campaign-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);