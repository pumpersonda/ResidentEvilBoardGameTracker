import { useCampaignStore } from '@/store/campaignStore';
import { ActiveCharacter, Character, CharacterHealth, Player } from '@/types';

const getCurrentCampaign = () => {
  const { allCampaigns, currentCampaignId } = useCampaignStore.getState();
  return allCampaigns.find(c => c.id === currentCampaignId) ?? null;
};

const makeCharacter = (id: string, name: string): Character => ({
  id,
  name,
  avatar: { uri: `avatar-${id}` },
});

const makePlayer = (id: string, realName: string): Player => ({
  id,
  realName,
});

const makeActiveCharacter = (
  characterId: string,
  name: string,
  health: CharacterHealth = { value: 5, isPoisoned: false }
): ActiveCharacter => ({
  character: makeCharacter(characterId, name),
  controlledBy: makePlayer(`player-${characterId}`, `Player ${name}`),
  health,
  inventory: [],
});

const resetStore = () => {
  useCampaignStore.setState({ allCampaigns: [], currentCampaignId: null });
};

describe('campaignStore - health mechanics', () => {
  beforeEach(() => {
    resetStore();
    useCampaignStore.getState().createCampaign({
      name: 'Test Campaign',
      gameVersion: 'RE1',
      difficulty: 'Normal',
    });
  });

  it('updates the health of the targeted active character', () => {
    const { addActiveCharacter, updateActiveCharacterHealth } = useCampaignStore.getState();

    addActiveCharacter(makeActiveCharacter('chris', 'Chris'));
    updateActiveCharacterHealth('chris', { value: 3, isPoisoned: false });

    const campaign = getCurrentCampaign();
    const chris = campaign?.activeCharacters.find(ac => ac.character.id === 'chris');

    expect(chris?.health).toEqual({ value: 3, isPoisoned: false });
  });

  it('sets the isPoisoned flag independently from the health value', () => {
    const { addActiveCharacter, updateActiveCharacterHealth } = useCampaignStore.getState();

    addActiveCharacter(makeActiveCharacter('jill', 'Jill'));
    updateActiveCharacterHealth('jill', { value: 4, isPoisoned: true });

    const campaign = getCurrentCampaign();
    const jill = campaign?.activeCharacters.find(ac => ac.character.id === 'jill');

    expect(jill?.health.isPoisoned).toBe(true);
    expect(jill?.health.value).toBe(4);
  });

  it('allows health to reach 0 (dead)', () => {
    const { addActiveCharacter, updateActiveCharacterHealth } = useCampaignStore.getState();

    addActiveCharacter(makeActiveCharacter('barry', 'Barry'));
    updateActiveCharacterHealth('barry', { value: 0, isPoisoned: false });

    const campaign = getCurrentCampaign();
    const barry = campaign?.activeCharacters.find(ac => ac.character.id === 'barry');

    expect(barry?.health.value).toBe(0);
  });

  it('only updates the targeted character, leaving other active characters untouched', () => {
    const { addActiveCharacter, updateActiveCharacterHealth } = useCampaignStore.getState();

    addActiveCharacter(makeActiveCharacter('chris', 'Chris'));
    addActiveCharacter(makeActiveCharacter('jill', 'Jill', { value: 5, isPoisoned: false }));

    updateActiveCharacterHealth('chris', { value: 1, isPoisoned: true });

    const campaign = getCurrentCampaign();
    const chris = campaign?.activeCharacters.find(ac => ac.character.id === 'chris');
    const jill = campaign?.activeCharacters.find(ac => ac.character.id === 'jill');

    expect(chris?.health).toEqual({ value: 1, isPoisoned: true });
    expect(jill?.health).toEqual({ value: 5, isPoisoned: false });
  });

  it('does not affect campaigns other than the current one', () => {
    const {
      createCampaign,
      setCurrentCampaignId,
      addActiveCharacter,
      updateActiveCharacterHealth,
    } = useCampaignStore.getState();

    const firstCampaignId = useCampaignStore.getState().currentCampaignId!;
    addActiveCharacter(makeActiveCharacter('chris', 'Chris'));

    createCampaign({ name: 'Second Campaign', gameVersion: 'RE2', difficulty: 'Hard' });
    addActiveCharacter(makeActiveCharacter('chris', 'Chris'));

    updateActiveCharacterHealth('chris', { value: 0, isPoisoned: true });

    const allCampaigns = useCampaignStore.getState().allCampaigns;
    const firstCampaign = allCampaigns.find(c => c.id === firstCampaignId);
    const secondCampaign = allCampaigns.find(c => c.id !== firstCampaignId);

    expect(firstCampaign?.activeCharacters[0].health).toEqual({ value: 5, isPoisoned: false });
    expect(secondCampaign?.activeCharacters[0].health).toEqual({ value: 0, isPoisoned: true });

    setCurrentCampaignId(firstCampaignId);
  });

  it('leaves state unchanged when the characterId does not match any active character', () => {
    const { addActiveCharacter, updateActiveCharacterHealth } = useCampaignStore.getState();

    addActiveCharacter(makeActiveCharacter('chris', 'Chris'));
    updateActiveCharacterHealth('unknown-id', { value: 0, isPoisoned: true });

    const campaign = getCurrentCampaign();
    const chris = campaign?.activeCharacters.find(ac => ac.character.id === 'chris');

    expect(chris?.health).toEqual({ value: 5, isPoisoned: false });
  });
});
