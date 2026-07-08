import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import DashboardScreen from '@/components/screens/DashboardScreen';
import CurrentCampaignScreen from '@/components/screens/CurrentCampaignScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#0f0f0f' },
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="CurrentCampaign" component={CurrentCampaignScreen} />
    </Stack.Navigator>
  );
}
