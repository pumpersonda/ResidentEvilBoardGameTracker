import React, { useMemo, useState } from 'react';
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
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Search, X } from 'lucide-react-native';
import { Campaign } from '@/types';
import { useCampaignStore } from '@/store/campaignStore';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

interface AssignItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  characterId: string;
}

export const AssignItemModal: React.FC<AssignItemModalProps> = ({
  isOpen,
  onClose,
  campaign,
  characterId,
}) => {
  const resolvedTheme = useResolvedTheme();
  const [query, setQuery] = useState('');
  const removeFromItemsBox = useCampaignStore(state => state.removeFromItemsBox);
  const addItemToActiveCharacter = useCampaignStore(state => state.addItemToActiveCharacter);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = useMemo(() => {
    if (!normalizedQuery) return campaign.itemsBox;
    return campaign.itemsBox.filter(item => item.name.toLowerCase().includes(normalizedQuery));
  }, [campaign.itemsBox, normalizedQuery]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleAssign = (itemId: string) => {
    const item = campaign.itemsBox.find(i => i.id === itemId);
    if (!item) return;
    removeFromItemsBox(item.id, 1);
    addItemToActiveCharacter(characterId, { ...item, quantity: 1 });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-card h-[85%] flex-col">
        <ModalHeader className="pb-3">
          <Text className="text-foreground text-xl font-semibold">Assign Item</Text>
          <ModalCloseButton>
            <X color={THEME_COLORS[resolvedTheme].mutedForeground} size={20} />
          </ModalCloseButton>
        </ModalHeader>

        <Input className="bg-background mb-3">
          <InputSlot className="pl-3">
            <InputIcon as={Search} />
          </InputSlot>
          <InputField
            placeholder="Search item box by name..."
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <InputSlot className="pr-3" onPress={() => setQuery('')}>
              <InputIcon as={X} />
            </InputSlot>
          )}
        </Input>

        <ModalBody className="flex-1 mt-0 mb-0" scrollEnabled showsVerticalScrollIndicator={false}>
          <VStack space="lg" className="pb-4">
            {visibleItems.length === 0 ? (
              <VStack className="items-center justify-center py-16">
                <Text className="text-muted-foreground text-center">
                  {normalizedQuery
                    ? `No items match "${query.trim()}".`
                    : 'The item box is empty.'}
                </Text>
              </VStack>
            ) : (
              <VStack className="bg-background border border-border rounded-xl overflow-hidden">
                {visibleItems.map((item, index) => {
                  const isLast = index === visibleItems.length - 1;

                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleAssign(item.id)}
                      className={`flex-row items-center justify-between gap-3 px-3 py-3 active:bg-muted/40 ${
                        isLast ? '' : 'border-b border-b-border'
                      }`}
                    >
                      <Text className="text-foreground font-medium flex-1" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-muted-foreground text-xs">x{item.quantity}</Text>
                    </Pressable>
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
