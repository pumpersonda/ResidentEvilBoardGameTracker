import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { Campaign } from '@/types';
import { DangerLevelControl } from '@/components/campain/DangerLevelControl';
import { getCampaignCompletion } from '@/utils/campaignProgress';

interface CampaignHeaderProps {
  campaign: Campaign;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign }) => {
  const { completed, total, percentage } = getCampaignCompletion(campaign);

  return (
    <VStack className="px-4 pt-6 pb-4 bg-card border-b border-border">
      <Text className="text-foreground text-2xl font-bold">{campaign.name}</Text>
      <Text className="text-muted-foreground">{campaign.game}</Text>

      <VStack space="xs" className="mt-2">
        <HStack className="items-center justify-between">
          <Text className="text-muted-foreground text-xs font-semibold">
            {`${percentage}% Complete`}
          </Text>
          <Text className="text-muted-foreground text-xs">{`${completed}/${total} scenarios`}</Text>
        </HStack>
        <Slider value={percentage} minValue={0} maxValue={100} isDisabled>
          <SliderTrack>
            <SliderFilledTrack className="bg-primary" />
          </SliderTrack>
          <SliderThumb className="opacity-0" />
        </Slider>
      </VStack>

      <DangerLevelControl campaign={campaign} />
    </VStack>
  );
};
