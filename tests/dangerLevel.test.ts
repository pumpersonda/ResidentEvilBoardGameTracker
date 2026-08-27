import { useCampaignStore } from '@/store/campaignStore';

const getCurrentCampaign = () => {
  const { allCampaigns, currentCampaignId } = useCampaignStore.getState();
  return allCampaigns.find(c => c.id === currentCampaignId) ?? null;
};

const resetStore = () => {
  useCampaignStore.setState({ allCampaigns: [], currentCampaignId: null });
};

describe('campaignStore - setDangerLevel', () => {
  beforeEach(() => {
    resetStore();
    useCampaignStore.getState().createCampaign({
      name: 'Test Campaign',
      gameVersion: 'RE1',
      difficulty: 'Normal',
    });
  });

  it('sets the danger level when the value is within range', () => {
    useCampaignStore.getState().setDangerLevel(10);

    expect(getCurrentCampaign()?.dangerLevel).toBe(10);
  });

  it('clamps to the game maxLevel when the value exceeds it', () => {
    useCampaignStore.getState().setDangerLevel(999);

    expect(getCurrentCampaign()?.dangerLevel).toBe(26);
  });

  it('clamps to 0 when the value is negative', () => {
    useCampaignStore.getState().setDangerLevel(-5);

    expect(getCurrentCampaign()?.dangerLevel).toBe(0);
  });

  it('accepts the maxLevel value itself without clamping it down', () => {
    useCampaignStore.getState().setDangerLevel(26);

    expect(getCurrentCampaign()?.dangerLevel).toBe(26);
  });

  it('clamps to the RE3 maxLevel for an RE3 campaign', () => {
    useCampaignStore.getState().createCampaign({
      name: 'RE3 Campaign',
      gameVersion: 'RE3',
      difficulty: 'Normal',
    });

    useCampaignStore.getState().setDangerLevel(999);

    expect(getCurrentCampaign()?.dangerLevel).toBe(16);
  });

  it('does not clamp for RE2, which has no danger level config', () => {
    useCampaignStore.getState().createCampaign({
      name: 'RE2 Campaign',
      gameVersion: 'RE2',
      difficulty: 'Normal',
    });

    useCampaignStore.getState().setDangerLevel(999);

    expect(getCurrentCampaign()?.dangerLevel).toBe(999);
  });

  it('only updates the current campaign, leaving others untouched', () => {
    const firstCampaignId = useCampaignStore.getState().currentCampaignId!;

    useCampaignStore.getState().createCampaign({
      name: 'Second Campaign',
      gameVersion: 'RE1',
      difficulty: 'Hard',
    });

    useCampaignStore.getState().setDangerLevel(15);

    const allCampaigns = useCampaignStore.getState().allCampaigns;
    const firstCampaign = allCampaigns.find(c => c.id === firstCampaignId);
    const secondCampaign = allCampaigns.find(c => c.id !== firstCampaignId);

    expect(firstCampaign?.dangerLevel).toBe(0);
    expect(secondCampaign?.dangerLevel).toBe(15);
  });
});
