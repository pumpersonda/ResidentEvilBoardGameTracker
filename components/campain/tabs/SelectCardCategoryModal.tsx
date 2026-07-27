import React, { useMemo } from 'react';
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@/components/ui/modal';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { ChevronRight, X } from 'lucide-react-native';
import { Card as CardModel, CardType, GameVersion } from '@/types';
import { getGameCards } from '@/data';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

interface SelectCardCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: GameVersion;
  onSelectCategory: (cardType: CardType) => void;
}

export const SelectCardCategoryModal: React.FC<SelectCardCategoryModalProps> = ({
  isOpen,
  onClose,
  game,
  onSelectCategory,
}) => {
  const resolvedTheme = useResolvedTheme();

  const categories = useMemo(
    () =>
      (Object.entries(getGameCards(game)) as [CardType, CardModel[]][])
        .filter(([, cards]) => cards.length > 0)
        .map(([cardType]) => cardType),
    [game]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalBackdrop />
      <ModalContent className="bg-card">
        <ModalHeader className="pb-3">
          <Text className="text-foreground text-xl font-semibold">Discard a Card</Text>
          <ModalCloseButton>
            <X color={THEME_COLORS[resolvedTheme].mutedForeground} size={20} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody className="mt-0 mb-4">
          <VStack className="bg-background border border-border rounded-xl overflow-hidden">
            {categories.map((cardType, index) => (
              <Pressable
                key={cardType}
                onPress={() => onSelectCategory(cardType)}
                className={`flex-row items-center justify-between px-3 py-3 active:bg-muted/40 ${
                  index === categories.length - 1 ? '' : 'border-b border-border'
                }`}
              >
                <Text className="text-foreground font-medium">{cardType}</Text>
                <ChevronRight color={THEME_COLORS[resolvedTheme].mutedForeground} size={18} />
              </Pressable>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
