import React, { useState } from 'react';
import { Pressable } from '@/components/ui/pressable';
import { Campaign } from '@/types';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';
import {
  DANGER_LEVEL_CONFIG,
  getDangerLevelColor,
  getDangerRingColor,
} from '@/constants/dangerLevel';
import { DangerRing } from '@/components/campain/dangerLevel/DangerRing';
import { DangerLevelModal } from '@/components/campain/dangerLevel/DangerLevelModal';

interface DangerLevelControlProps {
  campaign: Campaign;
}

const COMPACT_SIZE = 88;
const COMPACT_STROKE = 8;

// RE2 has no danger level dial; renders nothing when no config exists for the game version.
export const DangerLevelControl: React.FC<DangerLevelControlProps> = ({ campaign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolvedTheme = useResolvedTheme();
  const config = DANGER_LEVEL_CONFIG[campaign.game];

  if (!config) return null;

  const color = getDangerLevelColor(campaign.game, campaign.dangerLevel) ?? 'Green';
  const ringColor = getDangerRingColor(color, resolvedTheme);
  const trackColor = THEME_COLORS[resolvedTheme].track;

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Danger level ${campaign.dangerLevel} of ${config.maxLevel}. Tap to adjust.`}
        className="pt-2 active:opacity-80"
      >
        <DangerRing
          value={campaign.dangerLevel}
          max={config.maxLevel}
          size={COMPACT_SIZE}
          strokeWidth={COMPACT_STROKE}
          color={ringColor}
          trackColor={trackColor}
        />
      </Pressable>
      <DangerLevelModal campaign={campaign} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
