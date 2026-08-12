import React from 'react';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@/components/ui/slider';
import { Campaign } from '@/types';
import { useCampaignStore } from '@/store/campaignStore';
import {
  DANGER_LEVEL_BADGE_CLASSES,
  DANGER_LEVEL_CONFIG,
  DANGER_LEVEL_TRACK_CLASSES,
  getDangerLevelColor,
} from '@/constants/dangerLevel';

interface DangerLevelControlProps {
  campaign: Campaign;
}

// RE2 has no danger level dial; renders nothing when no config exists for the game version.
export const DangerLevelControl: React.FC<DangerLevelControlProps> = ({ campaign }) => {
  const setDangerLevel = useCampaignStore(state => state.setDangerLevel);
  const config = DANGER_LEVEL_CONFIG[campaign.game];

  if (!config) return null;

  const color = getDangerLevelColor(campaign.game, campaign.dangerLevel) ?? 'Green';

  return (
    <VStack space="xs" className="pt-1">
      <HStack className="justify-between items-center">
        <Text className="text-muted-foreground text-sm">Danger Level</Text>
        <Text
          className={`text-sm font-semibold px-2 py-0.5 border rounded-full ${DANGER_LEVEL_BADGE_CLASSES[color]}`}
        >
          {campaign.dangerLevel}
        </Text>
      </HStack>
      <Slider
        value={campaign.dangerLevel}
        minValue={0}
        maxValue={config.maxLevel}
        step={1}
        onChange={value => setDangerLevel(value)}
      >
        <SliderTrack>
          <SliderFilledTrack className={DANGER_LEVEL_TRACK_CLASSES[color]} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
};
