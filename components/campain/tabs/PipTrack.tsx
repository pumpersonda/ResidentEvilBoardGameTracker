import React from 'react';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';

interface PipTrackProps {
  length: number;
  value: number;
  onChange: (value: number) => void;
  accessibilityLabel: string;
  renderPip: (filled: boolean, pipValue: number) => React.ReactNode;
}

// Tap pip N to set the value to N; tapping the currently-topmost filled pip
// decrements by one, so the value can always reach 0 in at most two taps.
export const PipTrack: React.FC<PipTrackProps> = ({
  length,
  value,
  onChange,
  accessibilityLabel,
  renderPip,
}) => {
  const handlePress = (pipValue: number) => {
    onChange(pipValue === value ? pipValue - 1 : pipValue);
  };

  return (
    <HStack space="xs" className="flex-wrap items-center">
      {Array.from({ length }, (_, i) => i + 1).map(pipValue => (
        <Pressable
          key={pipValue}
          onPress={() => handlePress(pipValue)}
          accessibilityLabel={`${accessibilityLabel}: set to ${pipValue}`}
          hitSlop={6}
        >
          {renderPip(pipValue <= value, pipValue)}
        </Pressable>
      ))}
    </HStack>
  );
};
