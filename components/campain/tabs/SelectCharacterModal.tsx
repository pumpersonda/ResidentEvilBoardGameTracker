import React, { useMemo, useState } from 'react';
import { Image } from 'react-native';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { Check, X } from 'lucide-react-native';
import { Campaign, GameVersion } from '@/types';
import { CharacterProfile } from '@/data/RE1/characters';
import { getGameCharacters } from '@/data';
import { useCampaignStore } from '@/store/campaignStore';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

interface SelectCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

export const SelectCharacterModal: React.FC<SelectCharacterModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  const resolvedTheme = useResolvedTheme();
  const addActiveCharacter = useCampaignStore(state => state.addActiveCharacter);
  const addReserveCharacter = useCampaignStore(state => state.addReserveCharacter);

  const [expandedCharacterId, setExpandedCharacterId] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [isAdvancedChecked, setIsAdvancedChecked] = useState(false);
  const [isReservedChecked, setIsReservedChecked] = useState(false);

  const allCharacters = useMemo(() => getGameCharacters(campaign.game), [campaign.game]);
  const takenIds = useMemo(
    () =>
      new Set([
        ...campaign.activeCharacters.map(ac => ac.character.id),
        ...campaign.reserveCharacters.map(c => c.id),
      ]),
    [campaign.activeCharacters, campaign.reserveCharacters]
  );
  const availableCharacters = allCharacters.filter(c => !takenIds.has(c.id));

  const resetRowState = () => {
    setExpandedCharacterId(null);
    setPlayerName('');
    setIsAdvancedChecked(false);
    setIsReservedChecked(false);
  };

  const handleClose = () => {
    resetRowState();
    onClose();
  };

  const toggleRow = (character: CharacterProfile) => {
    if (expandedCharacterId === character.id) {
      resetRowState();
    } else {
      setExpandedCharacterId(character.id);
      setPlayerName('');
      setIsAdvancedChecked(false);
      setIsReservedChecked(false);
    }
  };

  const handleConfirm = (character: CharacterProfile) => {
    if (isReservedChecked) {
      addReserveCharacter(character);
    } else {
      addActiveCharacter({
        character,
        controlledBy: {
          id: Math.random().toString(36).substring(2, 9),
          realName: playerName.trim(),
        },
        health: { value: 5, isPoisoned: false },
        inventory: [],
        kerosene: campaign.game === GameVersion.RE1 ? 0 : undefined,
        isAdvancedVersion: isAdvancedChecked,
      });
    }
    resetRowState();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-card h-[85%] flex-col">
        <ModalHeader className="pb-3">
          <Text className="text-foreground text-xl font-semibold">Select Character</Text>
          <ModalCloseButton>
            <X color={THEME_COLORS[resolvedTheme].mutedForeground} size={20} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="flex-1 mt-0 mb-0" scrollEnabled showsVerticalScrollIndicator={false}>
          <VStack space="lg" className="pb-4">
            {availableCharacters.length === 0 ? (
              <VStack className="items-center justify-center py-16">
                <Text className="text-muted-foreground text-center">
                  All characters have already been added.
                </Text>
              </VStack>
            ) : (
              <VStack className="bg-background border border-border rounded-xl overflow-hidden">
                {availableCharacters.map((character, index) => {
                  const isLast = index === availableCharacters.length - 1;
                  const isExpanded = expandedCharacterId === character.id;

                  return (
                    <VStack key={character.id} className={isLast ? '' : 'border-b border-b-border'}>
                      <Pressable
                        onPress={() => toggleRow(character)}
                        className="flex-row items-center gap-3 px-3 py-3 active:bg-muted/40"
                      >
                        <Image
                          source={character.avatar}
                          className="w-10 h-10 rounded-full bg-muted"
                        />
                        <Text className="text-foreground font-medium flex-1" numberOfLines={1}>
                          {character.name}
                        </Text>
                      </Pressable>

                      {isExpanded && (
                        <VStack space="md" className="px-3 pb-4">
                          {!isReservedChecked && (
                            <Input className="bg-background">
                              <InputField
                                placeholder="Player name (optional)"
                                value={playerName}
                                onChangeText={setPlayerName}
                                autoCorrect={false}
                                returnKeyType="done"
                              />
                            </Input>
                          )}

                          {character.isAdvanced && (
                            <Checkbox
                              value="advanced"
                              isChecked={isAdvancedChecked}
                              onChange={setIsAdvancedChecked}
                            >
                              <CheckboxIndicator>
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel>Advanced Version</CheckboxLabel>
                            </Checkbox>
                          )}

                          {character.isReserved && (
                            <Checkbox
                              value="reserved"
                              isChecked={isReservedChecked}
                              onChange={setIsReservedChecked}
                            >
                              <CheckboxIndicator>
                                <CheckboxIcon as={Check} />
                              </CheckboxIndicator>
                              <CheckboxLabel>Add to Reserve</CheckboxLabel>
                            </Checkbox>
                          )}

                          <Button
                            className="bg-destructive active:opacity-90"
                            onPress={() => handleConfirm(character)}
                          >
                            <ButtonText>
                              {isReservedChecked ? 'Add to Reserve' : 'Add to Roster'}
                            </ButtonText>
                          </Button>
                        </VStack>
                      )}
                    </VStack>
                  );
                })}
              </VStack>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter className="pt-3">
          <Button className="flex-1 bg-secondary active:opacity-90" onPress={handleClose}>
            <ButtonText className="text-secondary-foreground">Done</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
