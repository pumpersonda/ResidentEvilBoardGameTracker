import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Campaign } from '@/types';
import { DangerLevelControl } from '@/components/campain/DangerLevelControl';

interface CampaignHeaderProps {
  campaign: Campaign;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => (
  <VStack className="px-4 pt-6 pb-4 bg-card border-b border-border">
    <Text className="text-foreground text-2xl font-bold">{campaign.name}</Text>
    <Text className="text-muted-foreground">{campaign.game}</Text>
    <DangerLevelControl campaign={campaign} />
  </VStack>
);
