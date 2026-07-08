import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Plus } from 'lucide-react-native';
import CampaignCard from '@/components/campain/CampaignCard';
import CreateCampaignModal from '@/components/screens/CreateCampaignModal';
import { useCampaignStore } from '@/store/campaignStore';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/components/navigation/types';

export default function DashboardScreen() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const campaigns = useCampaignStore(state => state.allCampaigns);
  const createCampaign = useCampaignStore(state => state.createCampaign);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setCurrentCampaignId = useCampaignStore(state => state.setCurrentCampaignId);

  const handleCreateCampaign = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenCampaign = (campaignId: string) => {
    setCurrentCampaignId(campaignId);
    navigation.navigate('CurrentCampaign');
  };

  return (
    <VStack className="flex-1 bg-zinc-950">
      {/* Header - Only title */}
      <HStack className="px-4 pt-4 pb-2 justify-between items-center">
        <Text className="text-white text-3xl font-bold">Campaigns</Text>
      </HStack>

      {/* Content */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {campaigns.length > 0 ? (
          <VStack space="md" className="py-2">
            {campaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                id={campaign.id}
                name={campaign.name}
                game={campaign.game}
                difficulty={campaign.difficulty}
                dangerLevel={campaign.dangerLevel}
                onPress={handleOpenCampaign}
              />
            ))}
          </VStack>
        ) : (
          // Improved Empty State
          <VStack className="flex-1 items-center justify-center py-20" space="lg">
            <VStack className="items-center" space="md">
              <Plus size={56} color="#3f3f46" />
              <Text className="text-zinc-300 text-xl font-semibold">No campaigns yet</Text>
              <Text className="text-zinc-500 text-center px-6">
                Create your first campaign to start tracking your{'\n'}
                Resident Evil board game progress.
              </Text>
            </VStack>
          </VStack>
        )}
      </ScrollView>

      {/* Floating Action Button - Only way to create a campaign */}
      <Pressable
        onPress={handleCreateCampaign}
        className="absolute bottom-8 right-6 bg-red-600 w-14 h-14 rounded-full items-center justify-center shadow-lg active:bg-red-700"
      >
        <Plus color="white" size={26} />
      </Pressable>
      <CreateCampaignModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createCampaign}
      />
    </VStack>
  );
}
