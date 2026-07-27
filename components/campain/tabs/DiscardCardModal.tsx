import React, { useMemo, useState } from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@/components/ui/modal';
import { Button, ButtonText } from '@/components/ui/button';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Search, Trash2, X } from 'lucide-react-native';
import { Card as CardModel, CardType, GameVersion } from '@/types';
import { getGameCards } from '@/data';
import { TENSION_ACCENT_CLASSES, isTensionCard } from './tensionCardDisplay';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

interface DiscardCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameVersion;
  cardType: CardType;
  onDiscard: (cardType: CardType, card: CardModel) => void;
}

export const DiscardCardModal: React.FC<DiscardCardModalProps> = ({
  isOpen,
  onClose,
  game,
  cardType,
  onDiscard,
}) => {
  const resolvedTheme = useResolvedTheme();
  const [query, setQuery] = useState('');

  const cards = useMemo(() => getGameCards(game)[cardType] ?? [], [game, cardType]);
  const normalizedQuery = query.trim().toLowerCase();

  const visibleCards = useMemo(() => {
    if (!normalizedQuery) return cards;
    return cards.filter(card => card.name.toLowerCase().includes(normalizedQuery));
  }, [cards, normalizedQuery]);

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-card h-[85%] flex-col">
        <ModalHeader className="pb-3">
          <Text className="text-foreground text-xl font-semibold">Discard a {cardType} Card</Text>
          <ModalCloseButton>
            <X color={THEME_COLORS[resolvedTheme].mutedForeground} size={20} />
          </ModalCloseButton>
        </ModalHeader>

        <Input className="bg-background mb-3">
          <InputSlot className="pl-3">
            <InputIcon as={Search} />
          </InputSlot>
          <InputField
            placeholder="Search cards by name..."
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
            {visibleCards.length === 0 ? (
              <VStack className="items-center justify-center py-16">
                <Text className="text-muted-foreground text-center">
                  {normalizedQuery
                    ? `No cards match "${query.trim()}".`
                    : 'No card data available for this category yet.'}
                </Text>
              </VStack>
            ) : (
              <VStack className="bg-background border border-border rounded-xl overflow-hidden">
                {visibleCards.map((card, index) => {
                  const accentClass = isTensionCard(card)
                    ? TENSION_ACCENT_CLASSES[card.color]
                    : 'border-l-border';
                  const isLast = index === visibleCards.length - 1;

                  return (
                    <Pressable
                      key={card.id}
                      onPress={() => onDiscard(cardType, { ...card, quantity: 1 })}
                      className={`flex-row items-center justify-between gap-3 border-l-4 ${accentClass} px-3 py-3 active:bg-muted/40 ${
                        isLast ? '' : 'border-b border-b-border'
                      }`}
                    >
                      <Text className="text-foreground font-medium flex-1" numberOfLines={1}>
                        {card.name}
                      </Text>
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
