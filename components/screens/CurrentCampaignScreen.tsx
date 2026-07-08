import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';
import { useCurrentCampaign } from '@/store/campaignStore';

type TabOption = 'Characters' | 'ItemBox' | 'Cards' | 'Scenarios';

const TABS: { id: TabOption; label: string }[] = [
  { id: 'Characters', label: 'Characters' },
  { id: 'ItemBox', label: 'Item Box' },
  { id: 'Cards', label: 'Cards' },
  { id: 'Scenarios', label: 'Scenarios' },
];

export default function CurrentCampaignScreen() {
  const campaign = useCurrentCampaign();
  const [activeTab, setActiveTab] = useState<TabOption>('Characters');

  if (!campaign) {
    return (
      <VStack className="flex-1 bg-zinc-950 items-center justify-center p-4">
        <Text className="text-zinc-400">No active campaign selected.</Text>
      </VStack>
    );
  }

  return (
    <VStack className="flex-1 bg-zinc-950">
      {/* Header Info */}
      <VStack className="px-4 pt-6 pb-4 bg-zinc-900 border-b border-zinc-800">
        <Text className="text-white text-2xl font-bold">{campaign.name}</Text>
        <Text className="text-zinc-400">
          {campaign.game} • Danger: {campaign.dangerLevel}
        </Text>
      </VStack>

      {/* Custom Tab Bar */}
      <HStack className="border-b border-zinc-800">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border-b-2 ${
                  isActive ? 'border-red-600' : 'border-transparent'
                }`}
              >
                <Text className={`font-semibold ${isActive ? 'text-red-600' : 'text-zinc-500'}`}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </HStack>

      {/* Tab Content Area */}
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {activeTab === 'Characters' && (
          <VStack space="md">
            <Text className="text-white text-lg">Active Characters Roster</Text>
            {/* TODO: Add Character Cards here */}
          </VStack>
        )}

        {activeTab === 'ItemBox' && (
          <VStack space="md">
            <Text className="text-white text-lg">Shared Item Box</Text>
            {/* TODO: List items in the box */}
          </VStack>
        )}

        {activeTab === 'Cards' && (
          <VStack space="md">
            <Text className="text-white text-lg">Campaign Cards</Text>
            <Text className="text-zinc-400 text-sm">Manage added and discarded cards here.</Text>
            {/* TODO: Cards management UI */}
          </VStack>
        )}

        {activeTab === 'Scenarios' && (
          <VStack space="md">
            <Text className="text-white text-lg">Scenario Tracker</Text>
            {/* TODO: Scenario list (to be done later) */}
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
