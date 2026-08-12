import { useCampaignStore } from '@/store/campaignStore';

const resetStore = () => {
  useCampaignStore.setState({ allCampaigns: [], currentCampaignId: null });
};

const createCampaign = (name: string) =>
  useCampaignStore.getState().createCampaign({ name, gameVersion: 'RE1', difficulty: 'Normal' });

describe('campaignStore - deleteCampaign', () => {
  beforeEach(() => {
    resetStore();
  });

  it('removes the campaign from allCampaigns', () => {
    createCampaign('Mansion Incident');
    const { id } = useCampaignStore.getState().allCampaigns[0];

    useCampaignStore.getState().deleteCampaign(id);

    expect(useCampaignStore.getState().allCampaigns).toHaveLength(0);
  });

  it('clears currentCampaignId when the deleted campaign was the current one', () => {
    createCampaign('Mansion Incident');
    const { id } = useCampaignStore.getState().allCampaigns[0];

    useCampaignStore.getState().deleteCampaign(id);

    expect(useCampaignStore.getState().currentCampaignId).toBeNull();
  });

  it('leaves currentCampaignId untouched when deleting a campaign that is not current', () => {
    createCampaign('First Campaign');
    const firstId = useCampaignStore.getState().currentCampaignId!;

    createCampaign('Second Campaign');
    const secondId = useCampaignStore.getState().currentCampaignId!;

    useCampaignStore.getState().setCurrentCampaignId(firstId);
    useCampaignStore.getState().deleteCampaign(secondId);

    const { allCampaigns, currentCampaignId } = useCampaignStore.getState();

    expect(currentCampaignId).toBe(firstId);
    expect(allCampaigns).toHaveLength(1);
    expect(allCampaigns[0].id).toBe(firstId);
  });

  it('only removes the targeted campaign, keeping the others intact', () => {
    createCampaign('First Campaign');
    createCampaign('Second Campaign');
    createCampaign('Third Campaign');

    const { allCampaigns } = useCampaignStore.getState();
    const [first, second, third] = allCampaigns;

    useCampaignStore.getState().deleteCampaign(second.id);

    const remaining = useCampaignStore.getState().allCampaigns;

    expect(remaining).toHaveLength(2);
    expect(remaining.map(c => c.id)).toEqual([first.id, third.id]);
  });

  it('is a no-op when deleting an id that does not exist', () => {
    createCampaign('Mansion Incident');
    const before = useCampaignStore.getState();

    useCampaignStore.getState().deleteCampaign('non-existent-id');

    const after = useCampaignStore.getState();

    expect(after.allCampaigns).toHaveLength(1);
    expect(after.allCampaigns).toEqual(before.allCampaigns);
    expect(after.currentCampaignId).toBe(before.currentCampaignId);
  });

  it('does nothing when there are no campaigns to delete', () => {
    useCampaignStore.getState().deleteCampaign('non-existent-id');

    const { allCampaigns, currentCampaignId } = useCampaignStore.getState();

    expect(allCampaigns).toEqual([]);
    expect(currentCampaignId).toBeNull();
  });
});
