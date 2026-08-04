import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Pressable } from '@/components/ui/pressable';
import { Campaign, Item, ItemCategory } from '@/types';
import { useCampaignStore } from '@/store/campaignStore';
import { Plus, Trash2 } from 'lucide-react-native';
import { AddItemModal } from './AddItemModal';

interface ItemBoxTabProps {
  campaign: Campaign;
}

const CATEGORY_ORDER: ItemCategory[] = ['S', 'A', 'B', 'C'];

export const ItemBoxTab: React.FC<ItemBoxTabProps> = ({ campaign }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const addItemToBox = useCampaignStore(state => state.addItemToBox);
  const removeFromItemsBox = useCampaignStore(state => state.removeFromItemsBox);

  const categories = CATEGORY_ORDER.map(
    category =>
      [category, campaign.itemsBox.filter(item => item.category === category)] as [
        ItemCategory,
        Item[],
      ]
  );
  const nonEmptyCategories = categories.filter(([, items]) => items.length > 0);

  const onDelete = (itemId: string) => {
    removeFromItemsBox(itemId, 1);
  };

  return (
    <VStack className="flex-1">
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {nonEmptyCategories.length === 0 ? (
          <VStack className="flex-1 items-center justify-center py-12">
            <Text className="text-muted-foreground">The item box is empty.</Text>
          </VStack>
        ) : (
          <VStack space="lg" className="pb-24">
            {nonEmptyCategories.map(([category, items]) => (
              <VStack key={category} space="sm">
                <Text className="text-foreground text-xl font-bold">Category {category}</Text>

                {items.map(item => (
                  <Card
                    key={item.id}
                    className="bg-card border border-border p-4 rounded-2xl text-center"
                  >
                    <HStack className="justify-between items-start">
                      <VStack className="flex-1">
                        <Text className="text-foreground font-semibold">{item.name}</Text>
                        <Text className="text-muted-foreground text-sm capitalize">
                          {item.itemType}
                          {item.ammunition ? ` · ${item.ammunition} rounds` : ''}
                        </Text>
                      </VStack>
                      <Text className="text-muted-foreground font-semibold ml-2">
                        x{item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => onDelete(item.id)}
                        className="px-3 rounded-full active:bg-destructive/10"
                        accessibilityLabel="Remove item"
                      >
                        <Trash2 color="gray" size={20} />
                      </Pressable>
                    </HStack>
                  </Card>
                ))}
              </VStack>
            ))}
          </VStack>
        )}
      </ScrollView>

      <Pressable
        onPress={() => setIsAddModalOpen(true)}
        className="absolute bottom-safe-or-8 right-6 bg-destructive w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90"
      >
        <Plus color="white" size={26} />
      </Pressable>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        game={campaign.game}
        onAddItem={addItemToBox}
      />
    </VStack>
  );
};
