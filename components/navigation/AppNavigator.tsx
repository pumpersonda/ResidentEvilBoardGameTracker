import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import DashboardScreen from '@/components/screens/DashboardScreen';
import CurrentCampaignScreen from '@/components/screens/CurrentCampaignScreen';
import { useResolvedTheme } from '@/hooks/useResolvedTheme';
import { THEME_COLORS } from '@/constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const resolvedTheme = useResolvedTheme();

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: THEME_COLORS[resolvedTheme].background },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CurrentCampaign" component={CurrentCampaignScreen} />
    </Stack.Navigator>
  );
}
