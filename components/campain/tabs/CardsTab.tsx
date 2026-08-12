import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { Campaign, Card as CardModel, CardType } from '@/types';
import { getGameCardData } from '@/data';
import { useCampaignStore } from '@/store/campaignStore';
import { Info, Plus, Trash2 } from 'lucide-react-native';
import { isTensionCard, TENSION_ACCENT_CLASSES } from './tensionCardDisplay';
import { SelectCardModal } from './SelectCardModal';
import { SelectCardCategoryModal } from './SelectCardCategoryModal';
import { CardsInfoModal } from './CardsInfoModal';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

interface CardsTabProps {
  campaign: Campaign;
}

type CardsMode = 'added' | 'discarded';

export const CardsTab: React.FC<CardsTabProps> = ({ campaign }) => {
  const resolvedTheme = useResolvedTheme();
  const [mode, setMode] = useState<CardsMode>('added');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CardType | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const addedCard = useCampaignStore(state => state.addedCard);
  const removeFromAddedCards = useCampaignStore(state => state.removeFromAddedCards);
  const discardCard = useCampaignStore(state => state.discardCard);
  const removeFromDiscardedCard = useCampaignStore(state => state.removeFromDiscardedCard);

  const cardsByCategory = mode === 'added' ? campaign.addedCards : campaign.discardedCards;
  const onSelect = mode === 'added' ? addedCard : discardCard;
  const onRemove = mode === 'added' ? removeFromAddedCards : removeFromDiscardedCard;
  const emptyMessage = mode === 'added' ? 'No cards added yet.' : 'No cards discarded yet.';

  const categories = Object.entries(cardsByCategory) as [CardType, CardModel[]][];
  const nonEmptyCategories = categories.filter(
    ([cardType, cards]) => cardType !== 'Item' && cards.length > 0
  );
  const onDelete = (cardType: CardType, cardId: string) => {
    onRemove(cardType, cardId, 1);
  };

  return (
    <VStack className="flex-1">
      <HStack className="items-center justify-between px-4 pt-4">
        <HStack className="flex-1 bg-secondary rounded-full p-1">
          {(['added', 'discarded'] as CardsMode[]).map(option => {
            const isActive = mode === option;
            return (
              <Pressable
                key={option}
                onPress={() => setMode(option)}
                className={`flex-1 items-center py-2 rounded-full ${isActive ? 'bg-destructive' : ''}`}
              >
                <Text
                  className={`font-semibold capitalize ${isActive ? 'text-white' : 'text-muted-foreground'}`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </HStack>

        <Pressable
          onPress={() => setIsInfoModalOpen(true)}
          className="p-2 ml-2 rounded-full bg-secondary active:opacity-80"
          accessibilityLabel="Explain Added vs. Discarded cards"
        >
          <Info color={THEME_COLORS[resolvedTheme].foreground} size={20} />
        </Pressable>
      </HStack>

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {nonEmptyCategories.length === 0 ? (
          <VStack className="flex-1 items-center justify-center py-12">
            <Text className="text-muted-foreground">{emptyMessage}</Text>
          </VStack>
        ) : (
          <VStack space="lg" className="pb-24">
            {nonEmptyCategories.map(([cardType, cards]) => (
              <VStack key={cardType} space="sm">
                <Text className="text-foreground text-xl font-bold">{cardType}</Text>

                {cards.map(card => {
                  const resolved = getGameCardData(campaign.game, cardType, card.id) ?? card;
                  const accentClass = isTensionCard(resolved)
                    ? TENSION_ACCENT_CLASSES[resolved.color]
                    : 'border-l-border';

                  return (
                    <Card
                      key={card.id}
                      className={`bg-card border border-border border-l-4 ${accentClass} p-4 rounded-2xl text-center`}
                    >
                      <HStack className="justify-between items-start">
                        <Text className="text-foreground font-semibold flex-1">
                          {resolved.name}
                        </Text>
                        <Text className="text-muted-foreground font-semibold ml-2">
                          x{card.quantity}
                        </Text>
                        <Pressable
                          onPress={() => onDelete(cardType, card.id)}
                          className="px-3 rounded-full active:bg-destructive/10"
                          accessibilityLabel="Eliminar carta"
                        >
                          <Trash2 color="gray" size={20} />
                        </Pressable>
                      </HStack>

                      {isTensionCard(resolved) && (
                        <Text className="text-muted-foreground text-sm mt-1 italic">
                          {resolved.quote}
                        </Text>
                      )}
                    </Card>
                  );
                })}
              </VStack>
            ))}
          </VStack>
        )}
      </ScrollView>

      <Pressable
        onPress={() => setIsCategoryModalOpen(true)}
        className="absolute bottom-safe-or-8 right-6 bg-destructive w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90"
      >
        <Plus color="white" size={26} />
      </Pressable>

      <SelectCardCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        game={campaign.game}
        mode={mode}
        onSelectCategory={cardType => {
          setIsCategoryModalOpen(false);
          setSelectedCategory(cardType);
        }}
      />

      {selectedCategory && (
        <SelectCardModal
          isOpen={selectedCategory !== null}
          onClose={() => setSelectedCategory(null)}
          game={campaign.game}
          cardType={selectedCategory}
          mode={mode}
          onSelect={onSelect}
        />
      )}

      <CardsInfoModal isOpen={isInfoModalOpen} onClose={() => setIsInfoModalOpen(false)} />
    </VStack>
  );
};
