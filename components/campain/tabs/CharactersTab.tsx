import React, { useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { ActiveCharacter, Campaign, HEALTH_LABELS } from '@/types';
import { useCampaignStore } from '@/store/campaignStore';
import { Pencil, Plus, Trash2 } from 'lucide-react-native';
import { SelectCharacterModal } from './SelectCharacterModal';
import { EditCharacterModal } from './EditCharacterModal';

interface CharactersTabProps {
  campaign: Campaign;
}

export const CharactersTab: React.FC<CharactersTabProps> = ({ campaign }) => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);
  const removeActiveCharacter = useCampaignStore(state => state.removeActiveCharacter);

  const editingCharacter: ActiveCharacter | null =
    campaign.activeCharacters.find(ac => ac.character.id === editingCharacterId) ?? null;

  const hasActiveCharacters = campaign.activeCharacters.length > 0;
  const hasReserveCharacters = campaign.reserveCharacters.length > 0;

  return (
    <VStack className="flex-1">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {!hasActiveCharacters && !hasReserveCharacters ? (
          <VStack className="flex-1 items-center justify-center py-12">
            <Text className="text-muted-foreground">No characters selected yet.</Text>
          </VStack>
        ) : (
          <VStack space="lg" className="pb-24">
            {hasActiveCharacters && (
              <VStack space="sm">
                <Text className="text-foreground text-xl font-bold">Active Roster</Text>

                {campaign.activeCharacters.map(activeCharacter => (
                  <Card
                    key={activeCharacter.character.id}
                    className="bg-card border border-border p-4 rounded-2xl"
                  >
                    <HStack space="md" className="items-center">
                      <Image
                        source={activeCharacter.character.avatar}
                        className="w-12 h-12 rounded-full bg-muted"
                      />
                      <VStack className="flex-1">
                        <HStack space="sm" className="items-center">
                          <Text className="text-foreground font-semibold">
                            {activeCharacter.character.name}
                          </Text>
                          {activeCharacter.isAdvancedVersion && (
                            <Text className="text-destructive text-xs font-semibold px-2 py-0.5 border border-destructive rounded-full">
                              Advanced
                            </Text>
                          )}
                        </HStack>
                        <Text className="text-muted-foreground text-sm">
                          {activeCharacter.controlledBy.realName || activeCharacter.character.name}
                        </Text>
                        <Text className="text-muted-foreground text-xs">
                          {HEALTH_LABELS[activeCharacter.health.value]}
                        </Text>
                      </VStack>
                      <Pressable
                        onPress={() => setEditingCharacterId(activeCharacter.character.id)}
                        className="px-3 rounded-full active:bg-muted"
                        accessibilityLabel="Edit character"
                      >
                        <Pencil color="gray" size={20} />
                      </Pressable>
                      <Pressable
                        onPress={() => removeActiveCharacter(activeCharacter.character.id)}
                        className="px-3 rounded-full active:bg-destructive/10"
                        accessibilityLabel="Remove character"
                      >
                        <Trash2 color="gray" size={20} />
                      </Pressable>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            )}

            {hasReserveCharacters && (
              <VStack space="sm">
                <Text className="text-foreground text-xl font-bold">Reserve</Text>

                {campaign.reserveCharacters.map(character => (
                  <Card key={character.id} className="bg-card border border-border p-4 rounded-2xl">
                    <HStack space="md" className="items-center">
                      <Image source={character.avatar} className="w-12 h-12 rounded-full bg-muted" />
                      <Text className="text-foreground font-semibold">{character.name}</Text>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            )}
          </VStack>
        )}
      </ScrollView>

      <Pressable
        onPress={() => setIsSelectModalOpen(true)}
        className="absolute bottom-safe-or-8 right-6 bg-destructive w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90"
      >
        <Plus color="white" size={26} />
      </Pressable>

      <SelectCharacterModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        campaign={campaign}
      />

      <EditCharacterModal
        isOpen={editingCharacter !== null}
        onClose={() => setEditingCharacterId(null)}
        campaign={campaign}
        activeCharacter={editingCharacter}
      />
    </VStack>
  );
};
