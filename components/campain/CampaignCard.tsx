import { Card, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';

export interface CampaignCardProps {
  id: string;
  name: string;
  game: string;
  difficulty: string;
  dangerLevel: number;
  progress: string;
  onPress: (id: string) => void;
}

export default function CampaignCard({
  id,
  name,
  game,
  difficulty,
  dangerLevel,
  progress,
  onPress,
}: CampaignCardProps) {
  return (
    <Pressable key={id} onPress={() => onPress(id)}>
      <Card className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
        <VStack space="xs">
          <HStack className="justify-between items-center">
            <Text className="text-white text-xl font-semibold">{name}</Text>
            <Text className="text-zinc-400">{game}</Text>
          </HStack>

          <HStack className="justify-between items-center">
            <Text className="text-zinc-400">
              {difficulty} • Danger: {dangerLevel}
            </Text>
            <Text className="text-emerald-400 font-medium">{progress}</Text>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
}
