import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/types';

interface CampaignHeaderProps {
  campaign: Campaign;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => (
  <VStack className="px-4 pt-6 pb-4 bg-zinc-900 border-b border-zinc-800">
    <Text className="text-white text-2xl font-bold">{campaign.name}</Text>
    <Text className="text-zinc-400">
      {campaign.game} • Danger Level: {campaign.dangerLevel}
    </Text>
  </VStack>
);
