import React from 'react';
import { Card } from '@/components/ui/card';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export interface CampaignCardProps {
  id: string;
  name: string;
  game: string;
  difficulty: string;
  dangerLevel: number;
  onPress: (id: string) => void;
}

export default function CampaignCard({
  id,
  name,
  game,
  difficulty,
  dangerLevel,
  onPress,
}: CampaignCardProps) {
  return (
    <Pressable key={id} onPress={() => onPress(id)}>
      <Card className="p-4 bg-card border border-border rounded-2xl">
        <VStack className="gap-2">
          <HStack className="justify-between items-center">
            <Text className="text-foreground text-xl font-semibold">{name}</Text>
            <Text className="text-muted-foreground">{game}</Text>
          </HStack>

          <HStack className="justify-between items-center">
            <Text className="text-muted-foreground">
              {difficulty} • Danger: {dangerLevel}
            </Text>
          </HStack>
        </VStack>
      </Card>
    </Pressable>
  );
}
