import { Campaign } from '@/types';

export interface CampaignCompletion {
  completed: number;
  total: number;
  percentage: number;
}

export const getCampaignCompletion = (campaign: Campaign): CampaignCompletion => {
  const scenarios = campaign.scenarios.filter(s =>
    campaign.enabledExpansions.includes(s.expansion)
  );
  const completed = scenarios.filter(s => s.status === 'Completed').length;
  const total = scenarios.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, total, percentage };
};
