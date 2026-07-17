import React from 'react';
import { ScrollView } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';

export type TabOption = 'Summary' | 'Characters' | 'ItemBox' | 'Cards' | 'Scenarios';

const TABS: { id: TabOption; label: string }[] = [
  { id: 'Summary', label: 'Overview' },
  { id: 'Characters', label: 'Characters' },
  { id: 'ItemBox', label: 'Item Box' },
  { id: 'Cards', label: 'Cards' },
  { id: 'Scenarios', label: 'Scenarios' },
];

interface CampaignTabBarProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

export const CampaignTabBar: React.FC<CampaignTabBarProps> = ({ activeTab, onTabChange }) => (
  <HStack className="border-b border-zinc-800 bg-zinc-950">
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-2">
      {TABS.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`px-4 py-4 border-b-2 ${isActive ? 'border-red-600' : 'border-transparent'}`}
          >
            <Text className={`font-semibold ${isActive ? 'text-red-600' : 'text-zinc-500'}`}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  </HStack>
);
