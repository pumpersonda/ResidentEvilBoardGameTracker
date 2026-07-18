import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Plus, Sun, Moon, MonitorSmartphone, Biohazard } from 'lucide-react-native';
import CampaignCard from '@/components/campain/CampaignCard';
import CreateCampaignModal from '@/components/screens/CreateCampaignModal';
import { useCampaignStore } from '@/store/campaignStore';
import { useThemeStore } from '@/store/themeStore';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';
import { ThemeMode } from '@/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/components/navigation/types';

const NEXT_THEME_MODE: Record<ThemeMode, ThemeMode> = {
  light: 'dark',
  dark: 'red',
  red: 'system',
  system: 'light',
};

const THEME_MODE_ICON = {
  light: Sun,
  dark: Moon,
  red: Biohazard,
  system: MonitorSmartphone,
} as const;

export default function DashboardScreen() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const campaigns = useCampaignStore(state => state.allCampaigns);
  const createCampaign = useCampaignStore(state => state.createCampaign);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setCurrentCampaignId = useCampaignStore(state => state.setCurrentCampaignId);
  const themeMode = useThemeStore(state => state.mode);
  const setThemeMode = useThemeStore(state => state.setMode);
  const resolvedTheme = useResolvedTheme();

  const handleCreateCampaign = () => {
    setIsCreateModalOpen(true);
  };

  const handleCycleTheme = () => {
    setThemeMode(NEXT_THEME_MODE[themeMode]);
  };

  const ThemeModeIcon = THEME_MODE_ICON[themeMode];

  const handleOpenCampaign = (campaignId: string) => {
    setCurrentCampaignId(campaignId);
    navigation.navigate('CurrentCampaign');
  };

  return (
    <VStack className="flex-1 bg-background">
      {/* Header - Title + theme toggle */}
      <HStack className="px-4 pt-4 pb-2 justify-between items-center">
        <Text className="text-foreground text-3xl font-bold">Campaigns</Text>
        <Pressable
          onPress={handleCycleTheme}
          className="p-2 rounded-full bg-secondary active:opacity-80"
        >
          <ThemeModeIcon color={THEME_COLORS[resolvedTheme].foreground} size={20} />
        </Pressable>
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
              <Plus size={56} color={THEME_COLORS[resolvedTheme].mutedForeground} />
              <Text className="text-foreground text-xl font-semibold">No campaigns yet</Text>
              <Text className="text-muted-foreground text-center px-6">
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
        className="absolute bottom-8 right-6 bg-destructive w-14 h-14 rounded-full items-center justify-center shadow-lg active:opacity-90"
      >
        {/* White reads well on both the light and dark destructive-red shades */}
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
