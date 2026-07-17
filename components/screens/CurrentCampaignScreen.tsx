import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { useCurrentCampaign } from '@/store/campaignStore';
import { CampaignTabBar, TabOption } from '@/components/campain/CampaignTabBar';
import { SummaryTab } from '@/components/campain/tabs/SummaryTab';
import { CampaignHeader } from '@/components/campain/CampaignHeader';

// TODO: Import your other tabs as you build them
// import { CharactersTab } from '@/components/campaign/tabs/CharactersTab';

export default function CurrentCampaignScreen() {
  const campaign = useCurrentCampaign();
  const [activeTab, setActiveTab] = useState<TabOption>('Summary');

  if (!campaign) {
    return (
      <VStack className="flex-1 bg-zinc-950 items-center justify-center p-4">
        <Text className="text-zinc-400">No active campaign selected.</Text>
      </VStack>
    );
  }

  /** Renders the corresponding tab content based on selected state */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Summary':
        return <SummaryTab campaign={campaign} />;
      case 'Characters':
        return <Text className="text-white">Active Characters Roster</Text>; // Replace with <CharactersTab campaign={campaign} />
      case 'ItemBox':
        return <Text className="text-white">Shared Item Box</Text>; // Replace with <ItemBoxTab campaign={campaign} />
      case 'Cards':
        return <Text className="text-white">Campaign Cards</Text>; // Replace with <CardsTab campaign={campaign} />
      case 'Scenarios':
        return <Text className="text-white">Scenario Tracker</Text>; // Replace with <ScenariosTab campaign={campaign} />
      default:
        return null;
    }
  };

  return (
    <VStack className="flex-1 bg-zinc-950">
      <CampaignHeader campaign={campaign} />
      <CampaignTabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </VStack>
  );
}
